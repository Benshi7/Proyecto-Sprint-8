from django.urls import path, include
from rest_framework.routers import DefaultRouter
from shared_models.models import Cliente
from .views import ClienteViewSet, UserList, UserDetail

router = DefaultRouter()

router.register(r'clientes', ClienteViewSet, basename='cliente')
router.register(r'usuarios', UserList, basename='usuario')
router.register(r'usuarios', UserDetail, basename='usuario_detalle')

urlpatterns = [
  path('', include(router.urls)),
]