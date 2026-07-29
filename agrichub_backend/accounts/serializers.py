from rest_framework import serializers
from django.contrib.auth import authenticate

from .models import User



class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=8
    )


    class Meta:
        model = User

        fields = [
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "role",
            "password",
        ]


    def create(self, validated_data):

        user = User.objects.create_user(
            **validated_data
        )

        return user



class LoginSerializer(serializers.Serializer):

    email = serializers.EmailField()

    password = serializers.CharField(
        write_only=True
    )


    def validate(self, data):

        user = authenticate(
            email=data["email"],
            password=data["password"]
        )


        if not user:
            raise serializers.ValidationError(
                "Invalid email or password"
            )


        if not user.is_active:
            raise serializers.ValidationError(
                "Account is inactive"
            )


        data["user"] = user

        return data



class ProfileSerializer(serializers.ModelSerializer):

    class Meta:

        model = User

        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "role",
            "is_verified",
            "created_at",
        ]