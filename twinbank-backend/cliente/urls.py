from django.urls import path, include
from rest_framework.routers import DefaultRouter
from shared_models.models import Cliente
from .views import ClienteViewSet

router = DefaultRouter()

router.register(r'clientes', ClienteViewSet, basename='cliente')