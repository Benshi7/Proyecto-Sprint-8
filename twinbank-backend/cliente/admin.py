from django.contrib import admin
from shared_models.models import Cliente, Tiposcliente, Marcastarjeta, AuditoriaCuenta, Tarjeta, Sucursal

# Register your models here.
@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('customer_id', 'customer_name', 'customer_surname', 'customer_dni', 'dob', 'branch_id', 'tipoclienteid')
    list_filter = ('customer_name', 'customer_surname', 'customer_dni', 'dob', 'branch_id', 'tipoclienteid')
    search_fields = ('customer_name', 'customer_surname', 'customer_dni', 'dob', 'branch_id', 'tipoclienteid__nombre')  # Use double-underscore and 'name' field from the related 'Tiposcliente' model
    list_per_page = 10

@admin.register(Tiposcliente)
class TiposclienteAdmin(admin.ModelAdmin):
    list_display = ('tipoclienteid', 'nombre', 'limite_prestamos')
    list_filter = ('nombre',)
    search_fields = ('nombre',)
    list_per_page = 10

@admin.register(Sucursal)
class SucursalAdmin(admin.ModelAdmin):
    list_display = ('branch_id', 'branch_number', 'branch_name', 'branch_address_id')
    list_filter = ('branch_number', 'branch_name', 'branch_address_id')
    search_fields = ('branch_number', 'branch_name', 'branch_address_id')
