from django.urls import path
from api.views import contact, ProfileView, RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib import admin
urlpatterns = [
    path('contact/', contact),
    path('api/profile/', ProfileView.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('admin/', admin.site.urls),
]