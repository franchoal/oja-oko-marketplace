from django.contrib import admin

from .models import Cart, CartItem


class CartItemInline(admin.TabularInline):
    """
    Display cart items inside the cart admin page.
    """

    model = CartItem
    extra = 0
    readonly_fields = (
        "product",
        "quantity",
        "subtotal",
    )

    def subtotal(self, obj):
        return obj.subtotal

    subtotal.short_description = "Subtotal"


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    """
    Admin configuration for buyer carts.
    """

    list_display = (
        "id",
        "buyer",
        "created_at",
        "updated_at",
    )

    search_fields = (
        "buyer__email",
        "buyer__first_name",
        "buyer__last_name",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    inlines = [
        CartItemInline,
    ]


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    """
    Admin configuration for cart items.
    """

    list_display = (
        "cart",
        "product",
        "quantity",
        "subtotal",
    )

    search_fields = (
        "product__name",
        "cart__buyer__email",
    )

    readonly_fields = (
        "subtotal",
    )

    def subtotal(self, obj):
        return obj.subtotal

    subtotal.short_description = "Subtotal"