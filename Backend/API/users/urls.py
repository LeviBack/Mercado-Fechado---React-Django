from rest_framework.routers import DefaultRouter
from django.urls import path
from .viewsets import UserViewSet
from .views import ProfileView
from rest_framework_simplejwt.views import TokenObtainPairView

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    *router.urls,

    # login (JWT)
    path('token/', TokenObtainPairView.as_view()),

    # rota protegida
    path('profile/', ProfileView.as_view()),
]