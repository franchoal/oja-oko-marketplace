from rest_framework import permissions


class IsFarmer(permissions.BasePermission):
    """
    Allows access only to authenticated users
    with the farmer role.
    """

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and request.user.role == "farmer"
        )