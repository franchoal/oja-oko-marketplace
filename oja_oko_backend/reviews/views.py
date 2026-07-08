from rest_framework import generics, permissions

from .models import Review
from .serializers import ReviewSerializer


class ProductReviewListView(generics.ListAPIView):
    """
    List reviews for a product.
    """

    serializer_class = ReviewSerializer

    permission_classes = [
        permissions.AllowAny,
    ]

    def get_queryset(self):
        product_id = self.kwargs["product_id"]

        return Review.objects.filter(
            product_id=product_id
        )


class ReviewCreateView(generics.CreateAPIView):
    """
    Buyers create product reviews.
    """

    serializer_class = ReviewSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def perform_create(self, serializer):
        serializer.save(
            buyer=self.request.user
        )