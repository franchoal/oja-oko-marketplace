from django.conf import settings
from django.db import models

from farmers.models import FarmerProfile
from products.models import Product


class Order(models.Model):
    """
    Represents a buyer order.

    Each order belongs to exactly one buyer and one farmer profile.

    If a buyer checks out products from multiple farmers,
    the checkout process creates one order per farmer.
    """

    DRAFT = "draft"
    PENDING = "pending"
    ACCEPTED = "accepted"
    PROCESSING = "processing"
    READY = "ready"
    OUT_FOR_DELIVERY = "out_for_delivery"
    DELIVERED = "delivered"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

    STATUS_CHOICES = [
        (DRAFT, "Draft"),
        (PENDING, "Pending"),
        (ACCEPTED, "Accepted"),
        (PROCESSING, "Processing"),
        (READY, "Ready"),
        (OUT_FOR_DELIVERY, "Out for Delivery"),
        (DELIVERED, "Delivered"),
        (COMPLETED, "Completed"),
        (CANCELLED, "Cancelled"),
    ]

    buyer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="orders",
    )

    farmer = models.ForeignKey(
        FarmerProfile,
        on_delete=models.PROTECT,
        related_name="orders",
    )

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default=PENDING,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Order"
        verbose_name_plural = "Orders"

    def __str__(self):
        return (
            f"Order #{self.id} | "
            f"{self.buyer.email} → "
            f"{self.farmer.user.email}"
        )


class OrderItem(models.Model):
    """
    Products contained inside an order.
    """

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items",
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT,
        related_name="order_items",
    )

    quantity = models.PositiveIntegerField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    class Meta:
        ordering = ["id"]
        verbose_name = "Order Item"
        verbose_name_plural = "Order Items"

    def __str__(self):
        return (
            f"{self.product.name} x {self.quantity}"
        )

    @property
    def subtotal(self):
        """
        Calculate the subtotal for an order item.
        """

        if self.price is None or self.quantity is None:
            return 0

        return self.price * self.quantity