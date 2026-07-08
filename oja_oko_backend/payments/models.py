from django.db import models

from orders.models import Order


class Payment(models.Model):
    """
    Represents payment information for an order.
    """

    CARD = "card"
    BANK_TRANSFER = "bank_transfer"

    PAYMENT_METHOD_CHOICES = [
        (CARD, "Card"),
        (BANK_TRANSFER, "Bank Transfer"),
    ]

    PENDING = "pending"
    SUCCESSFUL = "successful"
    FAILED = "failed"
    REFUNDED = "refunded"

    PAYMENT_STATUS_CHOICES = [
        (PENDING, "Pending"),
        (SUCCESSFUL, "Successful"),
        (FAILED, "Failed"),
        (REFUNDED, "Refunded"),
    ]

    order = models.OneToOneField(
        Order,
        on_delete=models.CASCADE,
        related_name="payment",
    )

    method = models.CharField(
        max_length=30,
        choices=PAYMENT_METHOD_CHOICES,
    )

    status = models.CharField(
        max_length=30,
        choices=PAYMENT_STATUS_CHOICES,
        default=PENDING,
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Payment"
        verbose_name_plural = "Payments"

    def __str__(self):
        return f"Payment #{self.id} - Order #{self.order.id}"
