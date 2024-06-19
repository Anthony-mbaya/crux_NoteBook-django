from django.contrib import admin
from django.urls import path, include
from my_api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView #prebuilt viewsa

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register', CreateUserView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth', include('rest_framework.urls')),
    path('api/', include('my_api.urls')),
]
