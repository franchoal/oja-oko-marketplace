from django.urls import path

from .views import (
    DeliveryDetailView,
    DeliveryListView,
    FarmerDeliveryDetailView,
    FarmerDeliveryListView,
)

app_name = "delivery"


urlpatterns = [
    # Buyer delivery endpoints
    path(
        "",
        DeliveryListView.as_view(),
        name="delivery-list",
    ),

    path(
        "<int:pk>/",
        DeliveryDetailView.as_view(),
        name="delivery-detail",
    ),


    # Farmer delivery endpoints
    path(
        "farmer/",
        FarmerDeliveryListView.as_view(),
        name="farmer-delivery-list",
    ),

    path(
        "farmer/<int:pk>/",
        FarmerDeliveryDetailView.as_view(),
        name="farmer-delivery-detail",
    ),
]