from django.urls import path
from .views import *

urlpatterns = [
    path('test/', test_api),
    path("login/", login_view),
    path("auth-status/", auth_status),

]
