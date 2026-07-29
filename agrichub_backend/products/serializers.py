from rest_framework import serializers
from django.db.models import Avg

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

    farmer = serializers.StringRelatedField(
        read_only=True,
    )

    category_name = serializers.CharField(
        source="category.name",
        read_only=True,
    )

    average_rating = serializers.SerializerMethodField()

    review_count = serializers.SerializerMethodField()


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
            "average_rating",
            "review_count",
        )


    def get_average_rating(self, obj):

        rating = obj.reviews.aggregate(
            average=Avg("rating")
        )["average"]

        return round(
            rating,
            1
        ) if rating else 0


    def get_review_count(self, obj):

        return obj.reviews.count()



class ProductDetailSerializer(serializers.ModelSerializer):

    farmer = serializers.StringRelatedField(
        read_only=True,
    )

    category_name = serializers.CharField(
        source="category.name",
        read_only=True,
    )

    average_rating = serializers.SerializerMethodField()

    review_count = serializers.SerializerMethodField()


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
            "average_rating",
            "review_count",
            "created_at",
            "updated_at",
        )


    def get_average_rating(self, obj):

        rating = obj.reviews.aggregate(
            average=Avg("rating")
        )["average"]

        return round(
            rating,
            1
        ) if rating else 0


    def get_review_count(self, obj):

        return obj.reviews.count()



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