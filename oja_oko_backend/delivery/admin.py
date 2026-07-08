from django.contrib import admin

from .models import Delivery


@admin.register(Delivery)
class DeliveryAdmin(admin.ModelAdmin):
    """
    Admin configuration for deliveries.
    """

    list_display = (
        "id",
        "order",
        "status",
        "tracking_number",
        "estimated_delivery_date",
        "created_at",
    )

    list_filter = (
        "status",
        "created_at",
    )

    search_fields = (
        "order__id",
        "order__buyer__email",
        "tracking_number",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )
