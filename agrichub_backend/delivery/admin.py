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
        "get_farmer",
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
        "order__farmer__farm_name",
        "order__farmer__user__email",
        "tracking_number",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )


    def get_farmer(self, obj):
        """
        Display farmer name in admin list.
        """

        return obj.order.farmer.farm_name

    get_farmer.short_description = "Farmer"