from django.urls import path

from .views import (
    DeliveryDetailView,
    DeliveryListView,
)

app_name = "delivery"

urlpatterns = [
    # Buyer delivery list
    path(
        "",
        DeliveryListView.as_view(),
        name="delivery-list",
    ),

    # Delivery detail
    path(
        "<int:pk>/",
        DeliveryDetailView.as_view(),
        name="delivery-detail",
    ),
]