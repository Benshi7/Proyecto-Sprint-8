from django.urls import path, include
from rest_framework.routers import DefaultRouter
from shared_models.models import Movimientos
from .views import PrestamosViewSet

router = DefaultRouter()

router.register(r'prestamos', PrestamosViewSet, basename='prestamos')

urlpatterns = [
  path('', include(router.urls)),
]