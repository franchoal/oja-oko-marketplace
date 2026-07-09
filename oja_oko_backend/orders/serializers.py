from rest_framework import serializers

from notifications.models import Notification
from payments.models import Payment

from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    """
    Serializer for products inside an order.
    """

    product_name = serializers.CharField(
        source="product.name",
        read_only=True,
    )

    subtotal = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        read_only=True,
    )

    class Meta:
        model = OrderItem

        fields = [
            "id",
            "product",
            "product_name",
            "quantity",
            "price",
            "subtotal",
        ]

        read_only_fields = [
            "id",
            "product_name",
            "subtotal",
        ]


class OrderSerializer(serializers.ModelSerializer):
    """
    Serializer for buyer and farmer order operations.
    """

    items = OrderItemSerializer(
        many=True,
        read_only=True,
    )

    total = serializers.SerializerMethodField()

    buyer = serializers.EmailField(
        source="buyer.email",
        read_only=True,
    )

    farmer = serializers.CharField(
        source="farmer.farm_name",
        read_only=True,
    )

    class Meta:
        model = Order

        fields = [
            "id",
            "buyer",
            "farmer",
            "status",
            "items",
            "total",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "buyer",
            "farmer",
            "items",
            "total",
            "created_at",
            "updated_at",
        ]

    def validate_status(self, value):
        """
        Validate order status progression.
        """

        order = self.instance

        if not order:
            return value

        allowed_transitions = {
            Order.PENDING: [
                Order.ACCEPTED,
                Order.CANCELLED,
            ],

            Order.ACCEPTED: [
                Order.PROCESSING,
                Order.CANCELLED,
            ],

            Order.PROCESSING: [
                Order.READY,
            ],

            Order.READY: [
                Order.OUT_FOR_DELIVERY,
            ],

            Order.OUT_FOR_DELIVERY: [
                Order.DELIVERED,
            ],

            Order.DELIVERED: [
                Order.COMPLETED,
            ],
        }

        current_status = order.status

        if value == current_status:
            return value

        if value not in allowed_transitions.get(
            current_status,
            [],
        ):
            raise serializers.ValidationError(
                "Invalid order status transition."
            )

        return value


    def update(self, instance, validated_data):
        """
        Update order and notify buyer when status changes.
        """

        old_status = instance.status

        order = super().update(
            instance,
            validated_data,
        )

        new_status = order.status

        if old_status != new_status:

            Notification.objects.create(
                user=order.buyer,
                title="Order Status Updated",
                message=(
                    f"Your order #{order.id} "
                    f"status has changed to "
                    f"{new_status.replace('_', ' ').title()}."
                ),
                notification_type=Notification.NEW_ORDER,
            )

        return order


    def get_total(self, obj):
        """
        Calculate the total value of the order.
        """

        return sum(
            item.subtotal
            for item in obj.items.all()
        )


class CheckoutSerializer(serializers.Serializer):
    """
    Serializer for buyer checkout.
    """

    delivery_address = serializers.CharField(
        max_length=500,
    )

    payment_method = serializers.ChoiceField(
        choices=Payment.PAYMENT_METHOD_CHOICES,
    )