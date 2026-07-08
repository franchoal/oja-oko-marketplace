from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)

from django.db import models
from django.utils import timezone


class UserManager(BaseUserManager):
    """
    Custom user manager for Oja-Oko users.
    """

    def create_user(
        self,
        email,
        password=None,
        **extra_fields
    ):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)

        return user


    def create_superuser(
        self,
        email,
        password=None,
        **extra_fields
    ):

        extra_fields.setdefault(
            "is_staff",
            True
        )

        extra_fields.setdefault(
            "is_superuser",
            True
        )

        extra_fields.setdefault(
            "is_active",
            True
        )

        return self.create_user(
            email,
            password,
            **extra_fields
        )



class User(
    AbstractBaseUser,
    PermissionsMixin
):

    """
    Main Oja-Oko user account.

    Users can be:
    - Farmers
    - Buyers
    """

    BUYER = "buyer"
    FARMER = "farmer"

    ROLE_CHOICES = (
        (BUYER, "Buyer"),
        (FARMER, "Farmer"),
    )


    email = models.EmailField(
        unique=True
    )

    first_name = models.CharField(
        max_length=100
    )

    last_name = models.CharField(
        max_length=100
    )

    phone_number = models.CharField(
        max_length=20,
        unique=True,
        null=True,
        blank=True
    )


    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default=BUYER
    )


    is_active = models.BooleanField(
        default=True
    )


    is_staff = models.BooleanField(
        default=False
    )


    is_verified = models.BooleanField(
        default=False
    )


    date_joined = models.DateTimeField(
        default=timezone.now
    )


    created_at = models.DateTimeField(
        auto_now_add=True
    )


    updated_at = models.DateTimeField(
        auto_now=True
    )


    objects = UserManager()


    USERNAME_FIELD = "email"


    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
    ]


    def __str__(self):
        return self.email