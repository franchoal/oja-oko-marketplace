from rest_framework import permissions


class IsFarmer(permissions.BasePermission):
    """
    Allows access only to authenticated farmers.
    """

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and request.user.role == "farmer"
        )