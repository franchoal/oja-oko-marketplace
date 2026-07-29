import uuid

from django.db import transaction

from delivery.models import Delivery
from notifications.models import Notification
from orders.models import Order

from .models import Payment


@transaction.atomic
def confirm_payment(payment):
    """
    Confirm a pending payment and update
    marketplace workflow.
    """

    if payment.status != Payment.PENDING:
        raise ValueError(
            "Payment has already been processed."
        )

    payment.status = Payment.SUCCESSFUL

    payment.save(
        update_fields=[
            "status",
            "updated_at",
        ]
    )


    order = payment.order

    order.status = Order.ACCEPTED

    order.save(
        update_fields=[
            "status",
            "updated_at",
        ]
    )


    delivery, created = Delivery.objects.get_or_create(
        order=order,
        defaults={
            "address": "",
            "status": Delivery.PENDING,
        },
    )


    if not delivery.tracking_number:

        delivery.tracking_number = (
            f"OJA-{uuid.uuid4().hex[:10].upper()}"
        )


    delivery.status = Delivery.ASSIGNED

    delivery.save(
        update_fields=[
            "tracking_number",
            "status",
            "updated_at",
        ]
    )


    Notification.objects.create(
        user=order.buyer,
        title="Payment Successful",
        message=(
            f"Payment for Order #{order.id} "
            "was successful. Your order has been accepted."
        ),
        notification_type=Notification.PAYMENT_UPDATE,
    )


    return payment