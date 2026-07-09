from django.contrib import admin

from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    """
    Display order items inside the order admin page.
    """

    model = OrderItem
    extra = 0

    readonly_fields = (
        "product",
        "quantity",
        "price",
        "subtotal",
    )

    def subtotal(self, obj):
        return obj.subtotal

    subtotal.short_description = "Subtotal"


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    """
    Admin configuration for orders.
    """

    list_display = (
        "id",
        "buyer",
        "farmer",
        "status",
        "created_at",
        "updated_at",
    )

    list_filter = (
        "status",
        "created_at",
        "farmer",
    )

    search_fields = (
        "buyer__email",
        "buyer__first_name",
        "buyer__last_name",
        "farmer__farm_name",
        "farmer__user__email",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    inlines = [
        OrderItemInline,
    ]


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    """
    Admin configuration for order items.
    """

    list_display = (
        "order",
        "product",
        "quantity",
        "price",
        "subtotal",
    )

    search_fields = (
        "product__name",
        "order__buyer__email",
    )

    readonly_fields = (
        "subtotal",
    )

    def subtotal(self, obj):
        return obj.subtotal

    subtotal.short_description = "Subtotal"