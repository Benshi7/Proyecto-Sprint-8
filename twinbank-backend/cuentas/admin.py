from django.contrib import admin
from shared_models.models import Cuenta, TipoCuenta

# Register your models here.
@admin.register(Cuenta)
class CuentaAdmin(admin.ModelAdmin):
    list_display = ('account_id', 'customer', 'balance', 'iban', 'tipo_cuenta')
    list_filter = ('customer', 'balance', 'iban', 'tipo_cuenta')
    search_fields = ('customer__customer_name', 'customer__customer_surname', 'customer__customer_dni', 'customer__dob', 'customer__branch_id', 'customer__tipoclienteid__nombre', 'balance', 'iban', 'tipo_cuenta__nombre')

@admin.register(TipoCuenta)
class TipoCuentaAdmin(admin.ModelAdmin):
    list_display = ('tipo_id', 'nombre')
    list_filter = ('nombre',)
    search_fields = ('nombre',)