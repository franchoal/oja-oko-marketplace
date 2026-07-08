from rest_framework import serializers

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
    Serializer for buyer orders.
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

    class Meta:
        model = Order

        fields = [
            "id",
            "buyer",
            "status",
            "items",
            "total",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "buyer",
            "items",
            "total",
            "created_at",
            "updated_at",
        ]

    def get_total(self, obj):
        """
        Calculate total order value.
        """

        return sum(
            item.subtotal
            for item in obj.items.all()
        )