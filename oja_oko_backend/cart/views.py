from rest_framework import generics, permissions, status
from rest_framework.response import Response

from products.models import Product

from .models import Cart, CartItem
from .serializers import (
    CartItemUpdateSerializer,
    CartSerializer,
)


class CartDetailView(generics.RetrieveAPIView):
    """
    View current buyer cart.
    """

    serializer_class = CartSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_object(self):
        cart, created = Cart.objects.get_or_create(
            buyer=self.request.user
        )

        return cart


class CartItemCreateView(generics.CreateAPIView):
    """
    Add product to buyer cart.
    """

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def create(self, request, *args, **kwargs):

        product_id = request.data.get("product")
        quantity = request.data.get("quantity", 1)

        try:
            product = Product.objects.get(
                id=product_id,
                is_available=True,
            )

        except Product.DoesNotExist:
            return Response(
                {
                    "detail": "Product not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        cart, created = Cart.objects.get_or_create(
            buyer=request.user
        )

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
        )

        if created:
            cart_item.quantity = quantity
        else:
            cart_item.quantity += int(quantity)

        cart_item.save()

        return Response(
            {
                "detail": "Product added to cart."
            },
            status=status.HTTP_201_CREATED,
        )


class CartItemUpdateView(generics.UpdateAPIView):
    """
    Update cart item quantity.
    """

    serializer_class = CartItemUpdateSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):

        return CartItem.objects.filter(
            cart__buyer=self.request.user
        )


class CartItemDeleteView(generics.DestroyAPIView):
    """
    Remove item from cart.
    """

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):

        return CartItem.objects.filter(
            cart__buyer=self.request.user
        )