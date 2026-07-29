from django.contrib import admin

from .models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    """
    Admin configuration for reviews.
    """

    list_display = (
        "id",
        "buyer",
        "product",
        "rating",
        "created_at",
    )

    list_filter = (
        "rating",
        "created_at",
    )

    search_fields = (
        "buyer__email",
        "product__name",
        "comment",
    )

    readonly_fields = (
        "created_at",
    )
