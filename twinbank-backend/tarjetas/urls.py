from django.urls import path, include
from rest_framework.routers import DefaultRouter
from shared_models.models import Tarjeta
from .views import TarjetaViewSet, TarjetaDetail, TarjetaList

router = DefaultRouter()

router.register(r'tarjetas', TarjetaViewSet, basename='Tarjetas')
router.register(r'tarjeta', TarjetaDetail, basename='tarjeta_detalle')

urlpatterns = [
  path('', include(router.urls)),
]