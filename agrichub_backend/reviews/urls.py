from django.urls import path

from .views import (
    ProductReviewListView,
    ReviewCreateView,
)

app_name = "reviews"

urlpatterns = [
    path(
        "",
        ReviewCreateView.as_view(),
        name="review-create",
    ),

    path(
        "products/<int:product_id>/",
        ProductReviewListView.as_view(),
        name="product-review-list",
    ),
]