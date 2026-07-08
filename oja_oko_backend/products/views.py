from rest_framework import filters, generics, permissions

from .models import Product
from .permissions import IsFarmerOrReadOnly, IsOwnerOrReadOnly
from .serializers import (
    ProductCreateUpdateSerializer,
    ProductDetailSerializer,
    ProductListSerializer,
)


class ProductListView(generics.ListAPIView):
    """
    Public product listing.
    """

    queryset = (
        Product.objects.select_related(
            "farmer",
            "category",
        )
        .filter(is_available=True)
        .order_by("-created_at")
    )

    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]

    filter_backends = [
    filters.SearchFilter,
    filters.OrderingFilter,
]

    search_fields = [
        "name",
        "description",
        "category__name",
        "farmer__first_name",
        "farmer__last_name",
    ]

    ordering_fields = [
        "price",
        "created_at",
        "name",
    ]


class ProductDetailView(generics.RetrieveAPIView):
    """
    Public product details.
    """

    queryset = Product.objects.select_related(
        "farmer",
        "category",
    )

    serializer_class = ProductDetailSerializer
    permission_classes = [permissions.AllowAny]


class ProductCreateView(generics.CreateAPIView):
    """
    Farmers create products.
    """

    serializer_class = ProductCreateUpdateSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsFarmerOrReadOnly,
    ]

    def perform_create(self, serializer):
        serializer.save(
            farmer=self.request.user
        )


class ProductUpdateView(generics.UpdateAPIView):
    """
    Farmers update their own products.
    """

    queryset = Product.objects.all()

    serializer_class = ProductCreateUpdateSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsFarmerOrReadOnly,
        IsOwnerOrReadOnly,
    ]


class ProductDeleteView(generics.DestroyAPIView):
    """
    Farmers delete their own products.
    """

    queryset = Product.objects.select_related(
    "farmer",
    "category",
)

    permission_classes = [
        permissions.IsAuthenticated,
        IsFarmerOrReadOnly,
        IsOwnerOrReadOnly,
    ]