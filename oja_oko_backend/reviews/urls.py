from django.urls import path

from .views import (
    ProductReviewListView,
    ReviewCreateView,
)

app_name = "reviews"

urlpatterns = [
    # Product reviews
    path(
        "product/<int:product_id>/",
        ProductReviewListView.as_view(),
        name="product-review-list",
    ),

    # Create review
    path(
        "create/",
        ReviewCreateView.as_view(),
        name="review-create",
    ),
]