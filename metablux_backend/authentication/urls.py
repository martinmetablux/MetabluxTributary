from django.urls import path
# from metablux_backend.authentication.google_auth import GoogleOAuthWeb
from .views import *

auth_urlspatterns = [
    path('test/', test_api),
    path("login/", login_view),
    path("auth-status/", auth_status),
]


web_google_urlpatterns = [
    # path('user/auth/google_oauth2',GoogleOAuthWeb.auth_login, name='googleoauthweb'),
    # path('user/auth/google_oauth2/callback',GoogleOAuthWeb.auth_callback, name='googleauthcallback'),
]

urlpatterns = auth_urlspatterns + web_google_urlpatterns