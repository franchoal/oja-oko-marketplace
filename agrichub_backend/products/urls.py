from django.urls import path

from .views import (
    CategoryListView,
    ProductCreateView,
    ProductDeleteView,
    ProductDetailView,
    ProductListView,
    ProductUpdateView,
)

app_name = "products"

urlpatterns = [
    # Public Endpoints
    path(
        "",
        ProductListView.as_view(),
        name="product-list",
    ),

    path(
        "categories/",
        CategoryListView.as_view(),
        name="category-list",
    ),

    path(
        "<int:pk>/",
        ProductDetailView.as_view(),
        name="product-detail",
    ),

    # Farmer Endpoints
    path(
        "create/",
        ProductCreateView.as_view(),
        name="product-create",
    ),

    path(
        "<int:pk>/update/",
        ProductUpdateView.as_view(),
        name="product-update",
    ),

    path(
        "<int:pk>/delete/",
        ProductDeleteView.as_view(),
        name="product-delete",
    ),
]