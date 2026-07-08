from django.urls import path

from .views import (
    OrderDetailView,
    OrderListView,
)

app_name = "orders"

urlpatterns = [
    # Buyer order list
    path(
        "",
        OrderListView.as_view(),
        name="order-list",
    ),

    # Single order detail
    path(
        "<int:pk>/",
        OrderDetailView.as_view(),
        name="order-detail",
    ),
]