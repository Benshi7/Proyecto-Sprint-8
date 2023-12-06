from django.urls import path, include
from rest_framework.routers import DefaultRouter
from shared_models.models import Cliente
from .views import ClienteViewSet, UserList, UserDetail

router = DefaultRouter()

router.register(r'clientes', ClienteViewSet, basename='cliente')
router.register(r'usuario', UserDetail, basename='usuario_detalle')
router.register(r'usuarios', UserList, basename='usuario')

urlpatterns = [
  path('', include(router.urls)),
]