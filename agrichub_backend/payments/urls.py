from django.urls import path

from .views import (
    PaymentDetailView,
    PaymentListView,
    PaymentConfirmView,
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


    # Confirm payment
    path(
        "<int:pk>/confirm/",
        PaymentConfirmView.as_view(),
        name="payment-confirm",
    ),
]