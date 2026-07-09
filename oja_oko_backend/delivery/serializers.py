from rest_framework import serializers

from .models import Delivery


class DeliverySerializer(serializers.ModelSerializer):
    """
    Serializer for delivery information.
    """

    order_id = serializers.IntegerField(
        source="order.id",
        read_only=True,
    )

    buyer = serializers.EmailField(
        source="order.buyer.email",
        read_only=True,
    )

    class Meta:
        model = Delivery

        fields = [
            "id",
            "order_id",
            "buyer",
            "address",
            "status",
            "tracking_number",
            "estimated_delivery_date",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "order_id",
            "buyer",
            "created_at",
            "updated_at",
        ]

    def validate_status(self, value):
        """
        Validate delivery status progression.
        """

        delivery = self.instance

        if not delivery:
            return value

        allowed_transitions = {
            Delivery.PENDING: [
                Delivery.ASSIGNED,
            ],

            Delivery.ASSIGNED: [
                Delivery.PICKED_UP,
            ],

            Delivery.PICKED_UP: [
                Delivery.IN_TRANSIT,
            ],

            Delivery.IN_TRANSIT: [
                Delivery.DELIVERED,
            ],
        }

        current_status = delivery.status

        if value == current_status:
            return value

        if value not in allowed_transitions.get(
            current_status,
            [],
        ):
            raise serializers.ValidationError(
                "Invalid delivery status transition."
            )

        return value