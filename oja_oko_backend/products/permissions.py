from rest_framework import permissions


class IsFarmerOrReadOnly(permissions.BasePermission):
    """
    Allows only farmers to create or modify products.

    Read access is allowed.
    """

    def has_permission(self, request, view):

        if request.method in permissions.SAFE_METHODS:
            return True

        return (
            request.user.is_authenticated
            and request.user.role == "farmer"
        )


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Allows only the farmer who owns the product
    to update or delete it.
    """

    def has_object_permission(
        self,
        request,
        view,
        obj,
    ):

        if request.method in permissions.SAFE_METHODS:
            return True

        return (
            obj.farmer.user == request.user
        )