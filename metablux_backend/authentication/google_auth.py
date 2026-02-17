# import google.auth
# from dashboard import settings
# from django.http import HttpResponseRedirect
# from django.http import HttpResponse
# from django.urls import reverse
# from django.shortcuts import redirect
# from django.contrib.auth import login, logout, get_user_model
# from django.contrib import messages
# import google.oauth2.credentials
# import google_auth_oauthlib.flow
# import google.auth.transport.requests
# from .views import User_redirect_page


# _scopes = ['https://www.googleapis.com/auth/userinfo.profile', 
#             'https://www.googleapis.com/auth/userinfo.email', 
#             'openid'
#             ]

# class GoogleOAuthWeb:

#     def auth_login(request):
#         if request.method == 'POST':
#             if request.user.is_authenticated:
#                 return HttpResponseRedirect(User_redirect_page(request.user.username))
#             g_flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
#                 settings.G_Oauth_File,
#                  scopes=_scopes
#                 )
#             g_flow.redirect_uri = request.build_absolute_uri(reverse('googleauthcallback'))


#             authorization_url, state = g_flow.authorization_url(
#                                                             access_type='offline',
#                                                             include_granted_scopes='true',
#                                                             prompt='select_account',
#                                                             )
#             request.session['state'] = state
#             return HttpResponseRedirect(authorization_url)
#         else:
#             return redirect('login')
           
#     @staticmethod
#     def auth_callback(request):
#         state = request.session.get('state')
#         if not state or state != request.GET.get('state'):
#             messages.error(request, "Invalid Request")
#             logout(request)
#             return redirect('login')

#         g_flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
#                     settings.G_Oauth_File,
#                     scopes=_scopes,
#                     state=state
#                     )
#         g_flow.redirect_uri = request.build_absolute_uri(reverse('googleauthcallback'))
#         g_flow.fetch_token(authorization_response=request.build_absolute_uri())
#         credentials = g_flow.credentials
#         user_info = GoogleOAuthWeb.profile_info(credentials)
        
#         if user_info['email_verified']:
#             user_model = get_user_model()            
#             if user_model.objects.filter(username=user_info['email']).exists():
#                 user = user_model.objects.get(username=user_info['email'])
#                 if user.is_active:
#                     login(request, user)
#                     return HttpResponseRedirect(User_redirect_page(user))
#                 else:
#                     messages.error(request, 'Your account has been inactivated. Kindly contact admin.')
#                     logout(request)
#                     return redirect('login')
#             else:
#                 messages.error(request, 'Your account is not registered. Kindly contact admin.')  
#                 logout(request)      
#                 return redirect('login')
    
    
#     def profile_info(credentials):
#         g_session = google.auth.transport.requests.AuthorizedSession(credentials)
#         user_info = g_session.get('https://www.googleapis.com/oauth2/v3/userinfo').json()
#         return user_info
    