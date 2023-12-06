from django.urls import path, include
from rest_framework.routers import DefaultRouter
from shared_models.models import Cuenta
from .views import CuentaViewSet

router = DefaultRouter()

router.register(r'cuentas', CuentaViewSet, basename='cuentas')

urlpatterns = [
  path('', include(router.urls)),
]