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
            "status",
            "tracking_number",
            "created_at",
            "updated_at",
        ]