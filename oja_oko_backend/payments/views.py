from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

from .models import Payment
from .serializers import PaymentSerializer
from .services import confirm_payment


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
        ).select_related(
            "order",
        )


class PaymentDetailView(generics.RetrieveAPIView):
    """
    Retrieve a single payment belonging to the authenticated buyer.
    """

    serializer_class = PaymentSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):

        return Payment.objects.filter(
            order__buyer=self.request.user
        ).select_related(
            "order",
        )


class PaymentConfirmView(generics.GenericAPIView):
    """
    Confirm payment for the authenticated buyer's order.

    In production this endpoint will later
    be replaced/connected with payment gateway confirmation.
    """

    serializer_class = PaymentSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request, pk):

        payment = get_object_or_404(
            Payment.objects.select_related(
                "order",
                "order__delivery",
            ),
            pk=pk,
            order__buyer=request.user,
        )

        payment = confirm_payment(
            payment
        )

        return Response(
            {
                "message": (
                    "Payment confirmed successfully."
                ),
                "payment": PaymentSerializer(
                    payment
                ).data,
            },
            status=status.HTTP_200_OK,
        )