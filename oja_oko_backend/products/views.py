from rest_framework import filters, generics, permissions

from .models import Category, Product
from .permissions import IsFarmerOrReadOnly, IsOwnerOrReadOnly
from .serializers import (
    CategorySerializer,
    ProductCreateUpdateSerializer,
    ProductDetailSerializer,
    ProductListSerializer,
)


class CategoryListView(generics.ListAPIView):
    """
    Public category listing.
    """

    queryset = Category.objects.order_by("name")

    serializer_class = CategorySerializer

    permission_classes = [
        permissions.AllowAny,
    ]


class ProductListView(generics.ListAPIView):
    """
    Public product listing.
    """

    queryset = (
        Product.objects.select_related(
            "farmer",
            "category",
        )
        .filter(is_available=True,
                farmer__is_verified=True,
        )
        .order_by("-created_at")
    )

    serializer_class = ProductListSerializer

    permission_classes = [
        permissions.AllowAny,
    ]

    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = [
        "name",
        "description",
        "category__name",
        "farmer__farm_name",
        "farmer__farm_location",
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

    permission_classes = [
        permissions.AllowAny,
    ]


class ProductCreateView(generics.CreateAPIView):
    """
    Farmers create products.

    Note:
    Farmer ownership is handled through FarmerProfile.
    """

    serializer_class = ProductCreateUpdateSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsFarmerOrReadOnly,
    ]

    def perform_create(self, serializer):
        serializer.save(
            farmer=self.request.user.farmer_profile
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