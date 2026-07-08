from rest_framework import generics, permissions

from .models import Delivery
from .serializers import DeliverySerializer


class DeliveryListView(generics.ListAPIView):
    """
    List deliveries belonging to the authenticated buyer.
    """

    serializer_class = DeliverySerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        return Delivery.objects.filter(
            order__buyer=self.request.user
        )


class DeliveryDetailView(generics.RetrieveAPIView):
    """
    View a single delivery belonging to the authenticated buyer.
    """

    serializer_class = DeliverySerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        return Delivery.objects.filter(
            order__buyer=self.request.user
        )