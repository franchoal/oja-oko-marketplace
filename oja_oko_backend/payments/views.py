from rest_framework import generics, permissions

from .models import Payment
from .serializers import PaymentSerializer


class PaymentDetailView(generics.RetrieveAPIView):
    """
    View payment details for an order belonging to the buyer.
    """

    serializer_class = PaymentSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        return Payment.objects.filter(
            order__buyer=self.request.user
        )


class PaymentListView(generics.ListAPIView):
    """
    List payments belonging to the authenticated buyer.
    """

    serializer_class = PaymentSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        return Payment.objects.filter(
            order__buyer=self.request.user
        )