from django.urls import path

from .views import (
    FarmerProfileView,
    FarmerProfileCreateView,
    FarmerProductListCreateView,
    FarmerProductDetailView,
)


urlpatterns = [
    path(
        "profile/",
        FarmerProfileView.as_view(),
        name="farmer-profile",
    ),

    path(
        "profile/create/",
        FarmerProfileCreateView.as_view(),
        name="farmer-profile-create",
    ),

    path(
        "products/",
        FarmerProductListCreateView.as_view(),
        name="farmer-products",
    ),

    path(
        "products/<int:pk>/",
        FarmerProductDetailView.as_view(),
        name="farmer-product-detail",
    ),
]