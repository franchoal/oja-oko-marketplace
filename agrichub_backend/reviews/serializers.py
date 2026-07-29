from rest_framework import serializers

from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    """
    Serializer for product reviews.
    """

    buyer = serializers.EmailField(
        source="buyer.email",
        read_only=True,
    )

    product_name = serializers.CharField(
        source="product.name",
        read_only=True,
    )

    class Meta:
        model = Review

        fields = [
            "id",
            "buyer",
            "product",
            "product_name",
            "rating",
            "comment",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "buyer",
            "product_name",
            "created_at",
        ]


    def validate_rating(self, value):
        """
        Ensure rating is between 1 and 5.
        """

        if value < 1 or value > 5:
            raise serializers.ValidationError(
                "Rating must be between 1 and 5."
            )

        return value