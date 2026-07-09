from django.conf import settings
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from products.models import Product


class Review(models.Model):
    """
    Represents a buyer review of a product.
    """

    buyer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="reviews",
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="reviews",
    )

    rating = models.PositiveIntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5),
        ],
    )

    comment = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True,
    )


    class Meta:
        ordering = [
            "-created_at",
        ]

        verbose_name = "Review"
        verbose_name_plural = "Reviews"

        constraints = [
            models.UniqueConstraint(
                fields=[
                    "buyer",
                    "product",
                ],
                name="unique_buyer_product_review",
            ),
        ]


    def __str__(self):

        return (
            f"{self.product.name} "
            f"- {self.rating}/5"
        )