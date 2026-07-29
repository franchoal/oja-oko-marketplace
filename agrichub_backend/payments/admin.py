from django.contrib import admin

from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    """
    Admin configuration for payments.
    """

    list_display = (
        "id",
        "order",
        "get_farmer",
        "method",
        "status",
        "amount",
        "created_at",
    )

    list_filter = (
        "method",
        "status",
        "created_at",
    )

    search_fields = (
        "order__id",
        "order__buyer__email",
        "order__farmer__farm_name",
        "order__farmer__user__email",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )


    def get_farmer(self, obj):
        """
        Display farmer name in payment admin list.
        """

        return obj.order.farmer.farm_name

    get_farmer.short_description = "Farmer"