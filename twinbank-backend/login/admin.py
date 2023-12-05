from django.contrib import admin

# Register your models here.
from shared_models.models import UsuarioCliente, Prestamo

@admin.register(UsuarioCliente)
class UsuarioClienteAdmin(admin.ModelAdmin):
    list_display = ('username', 'first_name', 'last_name', 'email', 'cliente', 'cliente_id')
    list_filter = ('username', 'first_name', 'last_name', 'email', 'cliente')
    search_fields = ('username', 'first_name', 'last_name', 'email', 'cliente__customer_name', 'cliente__customer_surname', 'cliente__customer_dni')
    list_per_page = 10
