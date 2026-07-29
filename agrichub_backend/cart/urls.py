from django.urls import path

from .views import (
    CartDetailView,
    CartItemCreateView,
    CartItemDeleteView,
    CartItemUpdateView,
)

app_name = "cart"

urlpatterns = [
    # View buyer cart
    path(
        "",
        CartDetailView.as_view(),
        name="cart-detail",
    ),

    # Add item to cart
    path(
        "items/",
        CartItemCreateView.as_view(),
        name="cart-item-create",
    ),

    # Update cart item quantity
    path(
        "items/<int:pk>/",
        CartItemUpdateView.as_view(),
        name="cart-item-update",
    ),

    # Remove cart item
    path(
        "items/<int:pk>/delete/",
        CartItemDeleteView.as_view(),
        name="cart-item-delete",
    ),
]