from rest_framework import serializers
from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            "id",
            "name",
            "slug",
        )


class ProductListSerializer(serializers.ModelSerializer):
    farmer = serializers.StringRelatedField(read_only=True)
    category_name = serializers.CharField(
        source="category.name",
        read_only=True,
    )

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "price",
            "quantity",
            "unit",
            "image",
            "is_available",
            "category_name",
            "farmer",
        )


class ProductDetailSerializer(serializers.ModelSerializer):
    farmer = serializers.StringRelatedField(read_only=True)
    category_name = serializers.CharField(
        source="category.name",
        read_only=True,
    )

    class Meta:
        model = Product
        fields = (
            "id",
            "farmer",
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
        )


class ProductCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        exclude = (
            "farmer",
        )

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Price must be greater than zero."
            )
        return value

    def validate_quantity(self, value):
        if value < 1:
            raise serializers.ValidationError(
                "Quantity must be at least 1."
            )
        return value