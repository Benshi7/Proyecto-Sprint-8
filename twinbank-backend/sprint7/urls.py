"""
URL configuration for sprint7 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from cliente.views import *
from cuentas.views import *
from login.views import *
from tarjetas.views import *
from movimientos.views import *
from prestamos.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', home, name='home2'),
    path('clientes/', cliente_list, name='cliente_list'),
    path('clientes/<int:cliente_id>/', cliente_detail, name='cliente_detail'),
    path('clientes/<int:cliente_id>/crear_cuenta/', crear_cuenta_bancaria, name='crear_cuenta_bancaria'),
    path('register/', RegisterView.as_view(), name='register'),
    path('register_new/', RegisterAndCreateView.as_view(), name='register_new'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('', HomeView.as_view(), name='home'),
    path('clientes/<int:cliente_id>/tarjetas', tarjetas_detail, name='tarjetas_detail'),
    path('clientes/<int:cliente_id>/cuentas/', lista_cuentas, name='lista_cuentas'),
    path('clientes/<int:cliente_id>/crear_tarjeta/', crear_tarjeta, name='crear_tarjeta'),
    path('clientes/<int:cliente_id>/cuentas/<int:cuenta_id>/', movimientos_detail, name='movimientos_detail'),
    path('clientes/<int:cliente_id>/solicitud_prestamo/', solicitud_prestamo, name='solicitud_prestamo'),
    path('clientes/<int:cliente_id>/listar_prestamos/', listar_prestamos, name='listar_prestamos'),
]
