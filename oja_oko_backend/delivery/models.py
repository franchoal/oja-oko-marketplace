from django.db import models

from orders.models import Order


class Delivery(models.Model):
    """
    Represents delivery information for an order.
    """

    PENDING = "pending"
    ASSIGNED = "assigned"
    PICKED_UP = "picked_up"
    IN_TRANSIT = "in_transit"
    DELIVERED = "delivered"

    DELIVERY_STATUS_CHOICES = [
        (PENDING, "Pending"),
        (ASSIGNED, "Assigned"),
        (PICKED_UP, "Picked Up"),
        (IN_TRANSIT, "In Transit"),
        (DELIVERED, "Delivered"),
    ]

    order = models.OneToOneField(
        Order,
        on_delete=models.CASCADE,
        related_name="delivery",
    )

    address = models.TextField()

    status = models.CharField(
        max_length=30,
        choices=DELIVERY_STATUS_CHOICES,
        default=PENDING,
    )

    tracking_number = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        null=True,
    )

    estimated_delivery_date = models.DateField(
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-created_at"]

        verbose_name = "Delivery"
        verbose_name_plural = "Deliveries"

    def __str__(self):
        return f"Delivery for Order #{self.order.id}"
