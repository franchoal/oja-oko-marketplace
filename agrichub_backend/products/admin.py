from django.contrib import admin
from .models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "slug",
    )

    search_fields = (
        "name",
    )

    prepopulated_fields = {
        "slug": (
            "name",
        )
    }

    ordering = (
        "name",
    )


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "farmer",
        "category",
        "price",
        "quantity",
        "unit",
        "is_available",
        "created_at",
    )

    list_filter = (
        "category",
        "unit",
        "is_available",
        "created_at",
    )

    search_fields = (
        "name",
        "description",
        "farmer__first_name",
        "farmer__last_name",
        "farmer__email",
    )

    list_per_page = 25

    ordering = (
        "-created_at",
    )

    date_hierarchy = "created_at"