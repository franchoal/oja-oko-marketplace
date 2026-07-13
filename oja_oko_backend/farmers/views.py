from rest_framework import generics, permissions
from rest_framework.exceptions import (
    NotFound,
    PermissionDenied,
)

from products.models import Product

from .models import FarmerProfile
from .permissions import IsFarmer
from .serializers import (
    FarmerProfileSerializer,
    FarmerProductSerializer,
)


class FarmerProfileView(generics.RetrieveUpdateAPIView):
    """
    Retrieve and update the authenticated
    farmer's profile.

    URL:
        GET /api/farmers/profile/
        PUT /api/farmers/profile/

    No primary key is required because
    each authenticated farmer only owns
    one profile.
    """

    serializer_class = FarmerProfileSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsFarmer,
    ]

    def get_object(self):
        try:
            return FarmerProfile.objects.get(
                user=self.request.user
            )

        except FarmerProfile.DoesNotExist:
            raise NotFound(
                "Farmer profile does not exist. Please create your profile first."
            )


class FarmerProfileCreateView(generics.CreateAPIView):
    """
    Create authenticated farmer profile.

    URL:
        POST /api/farmers/profile/create/
    """

    serializer_class = FarmerProfileSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsFarmer,
    ]

    def perform_create(self, serializer):

        if FarmerProfile.objects.filter(
            user=self.request.user
        ).exists():
            raise PermissionDenied(
                "Farmer profile already exists."
            )

        serializer.save(
            user=self.request.user
        )


class FarmerProductListCreateView(generics.ListCreateAPIView):
    """
    Farmers can list and create
    their own products.
    """

    serializer_class = FarmerProductSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsFarmer,
    ]

    def get_queryset(self):

        return (
            Product.objects.filter(
                farmer__user=self.request.user
            )
            .select_related(
                "category",
                "farmer",
            )
            .order_by("-created_at")
        )

    def perform_create(self, serializer):

        try:
            farmer_profile = FarmerProfile.objects.get(
                user=self.request.user
            )

        except FarmerProfile.DoesNotExist:
            raise PermissionDenied(
                "Please create your farmer profile before adding products."
            )

        serializer.save(
            farmer=farmer_profile
        )


class FarmerProductDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    """
    Retrieve, update and delete
    products belonging to the
    authenticated farmer only.
    """

    serializer_class = FarmerProductSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsFarmer,
    ]

    def get_queryset(self):

        return (
            Product.objects.filter(
                farmer__user=self.request.user
            )
            .select_related(
                "category",
                "farmer",
            )
        )