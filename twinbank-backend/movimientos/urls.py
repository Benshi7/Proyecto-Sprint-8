from django.urls import path, include
from rest_framework.routers import DefaultRouter
from shared_models.models import Movimientos
from .views import MovimientosViewSet

router = DefaultRouter()

router.register(r'movimientos', MovimientosViewSet, basename='movimientos')

urlpatterns = [
  path('', include(router.urls)),
]