from rest_framework import generics, permissions

from .models import Order
from .serializers import OrderSerializer


class OrderListView(generics.ListAPIView):
    """
    List orders belonging to the authenticated buyer.
    """

    serializer_class = OrderSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        return Order.objects.filter(
            buyer=self.request.user
        ).prefetch_related(
            "items__product"
        )


class OrderDetailView(generics.RetrieveAPIView):
    """
    View a single order belonging to the authenticated buyer.
    """

    serializer_class = OrderSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        return Order.objects.filter(
            buyer=self.request.user
        ).prefetch_related(
            "items__product"
        )