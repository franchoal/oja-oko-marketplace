from django.urls import path

from .views import (
    CheckoutView,
    FarmerOrderDetailView,
    FarmerOrderListView,
    OrderDetailView,
    OrderListView,
)

app_name = "orders"


urlpatterns = [
    # Buyer endpoints
    path(
        "",
        OrderListView.as_view(),
        name="order-list",
    ),

    path(
        "checkout/",
        CheckoutView.as_view(),
        name="checkout",
    ),

    path(
        "<int:pk>/",
        OrderDetailView.as_view(),
        name="order-detail",
    ),


    # Farmer endpoints
    path(
        "farmer/",
        FarmerOrderListView.as_view(),
        name="farmer-order-list",
    ),

    path(
        "farmer/<int:pk>/",
        FarmerOrderDetailView.as_view(),
        name="farmer-order-detail",
    ),
]