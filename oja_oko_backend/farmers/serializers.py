from rest_framework import serializers

from products.models import Product

from .models import FarmerProfile


class FarmerProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for farmer profiles.
    """

    email = serializers.EmailField(
        source="user.email",
        read_only=True,
    )

    class Meta:
        model = FarmerProfile

        fields = [
            "id",
            "email",
            "farm_name",
            "farm_location",
            "farm_description",
            "is_verified",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "email",
            "is_verified",
            "created_at",
            "updated_at",
        ]


class FarmerProductSerializer(serializers.ModelSerializer):
    """
    Serializer for products managed by farmers.

    Farmer ownership is handled automatically
    from the authenticated farmer profile.
    """
    category_name = serializers.CharField(
        source="category.name",
        read_only=True,
    )

    class Meta:
        model = Product

        fields = [
            "id",
            "category",
            "category_name",
            "name",
            "description",
            "price",
            "quantity",
            "unit",
            "image",
            "is_available",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "category_name",
            "created_at",
            "updated_at",
        ]

    def validate_price(self, value):
        """
        Ensure product price is valid.
        """

        if value <= 0:
            raise serializers.ValidationError(
                "Price must be greater than zero."
            )

        return value

    def validate_quantity(self, value):
        """
        Ensure inventory quantity is valid.
        """

        if value < 1:
            raise serializers.ValidationError(
                "Quantity must be at least 1."
            )

        return value