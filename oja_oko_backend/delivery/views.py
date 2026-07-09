from rest_framework import generics, permissions

from .models import Delivery
from .serializers import DeliverySerializer


class DeliveryListView(generics.ListAPIView):
    """
    Buyers view their deliveries.
    """

    serializer_class = DeliverySerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):

        return Delivery.objects.filter(
            order__buyer=self.request.user
        ).select_related(
            "order",
            "order__buyer",
            "order__farmer",
        )


class DeliveryDetailView(generics.RetrieveAPIView):
    """
    Buyers view a single delivery.
    """

    serializer_class = DeliverySerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):

        return Delivery.objects.filter(
            order__buyer=self.request.user
        ).select_related(
            "order",
            "order__buyer",
            "order__farmer",
        )


class FarmerDeliveryListView(generics.ListAPIView):
    """
    Farmers view deliveries for their orders.
    """

    serializer_class = DeliverySerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):

        return Delivery.objects.filter(
            order__farmer__user=self.request.user
        ).select_related(
            "order",
            "order__buyer",
            "order__farmer",
        )


class FarmerDeliveryDetailView(generics.RetrieveUpdateAPIView):
    """
    Farmers update delivery progress for their orders.
    """

    serializer_class = DeliverySerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):

        return Delivery.objects.filter(
            order__farmer__user=self.request.user
        ).select_related(
            "order",
            "order__buyer",
            "order__farmer",
        )