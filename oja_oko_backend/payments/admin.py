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
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )
