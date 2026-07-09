from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied

from products.models import Product

from .models import FarmerProfile
from .permissions import IsFarmer
from .serializers import (
    FarmerProfileSerializer,
    FarmerProductSerializer,
)


class FarmerProfileView(generics.RetrieveUpdateAPIView):
    """
    View and update authenticated farmer profile.
    """

    serializer_class = FarmerProfileSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsFarmer,
    ]

    def get_queryset(self):
        return FarmerProfile.objects.filter(
            user=self.request.user
        )


class FarmerProfileCreateView(generics.CreateAPIView):
    """
    Create authenticated farmer profile.
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
    Farmers can view and create their own products.
    """

    serializer_class = FarmerProductSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsFarmer,
    ]

    def get_queryset(self):

        return Product.objects.filter(
            farmer__user=self.request.user
        ).select_related(
            "category",
            "farmer",
        )

    def perform_create(self, serializer):

        farmer_profile = FarmerProfile.objects.get(
            user=self.request.user
        )

        serializer.save(
            farmer=farmer_profile
        )


class FarmerProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Farmers can view, update, and delete their own products.
    """

    serializer_class = FarmerProductSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsFarmer,
    ]

    def get_queryset(self):

        return Product.objects.filter(
            farmer__user=self.request.user
        ).select_related(
            "category",
            "farmer",
        )