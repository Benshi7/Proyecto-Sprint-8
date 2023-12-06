from django.urls import path, include
from rest_framework.routers import DefaultRouter
from shared_models.models import Tarjeta
from .views import TarjetaViewSet

router = DefaultRouter()

router.register(r'tarjetas', TarjetaViewSet, basename='Tarjetas')

urlpatterns = [
  path('', include(router.urls)),
]