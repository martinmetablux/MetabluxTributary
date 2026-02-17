from django.contrib.auth import logout
from functools import wraps
from django.shortcuts import redirect
from rest_framework import permissions

# ===((( Super Admin Permission )))===
def Is_Superadmin(user):
    if user.is_authenticated and user.is_superadmin and user.is_active:
        return True
    return False

def Superadmin_access():
    def decorator(view):
        @wraps(view)
        def wrapper(request, *args, **kwargs):
            if not Is_Superadmin(request.user):
                logout(request)
                return redirect('login')
            return view(request, *args, **kwargs)
        return wrapper
    return decorator


# ===((( Admin Permission )))===
def Is_Admin(user):
    if user.is_authenticated and user.is_admin and user.is_active:
        return True
    return False

def Superadmin_access():
    def decorator(view):
        @wraps(view)
        def wrapper(request, *args, **kwargs):
            if not Is_Admin(request.user):
                logout(request)
                return redirect('login')
            return view(request, *args, **kwargs)
        return wrapper
    return decorator

# ===((( User Permission )))===
def Is_User(user):
    if user.is_authenticated and user.is_user and user.is_active:
        return True
    return False

def Superadmin_access():
    def decorator(view):
        @wraps(view)
        def wrapper(request, *args, **kwargs):
            if not Is_User(request.user):
                logout(request)
                return redirect('login')
            return view(request, *args, **kwargs)
        return wrapper
    return decorator