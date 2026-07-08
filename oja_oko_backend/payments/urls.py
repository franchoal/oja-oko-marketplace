from django.urls import path

from .views import (
    PaymentDetailView,
    PaymentListView,
)

app_name = "payments"

urlpatterns = [
    # Buyer payment list
    path(
        "",
        PaymentListView.as_view(),
        name="payment-list",
    ),

    # Payment detail
    path(
        "<int:pk>/",
        PaymentDetailView.as_view(),
        name="payment-detail",
    ),
]