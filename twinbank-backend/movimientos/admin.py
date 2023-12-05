from django.contrib import admin
from shared_models.models import Movimientos

# Register your models here.
@admin.register(Movimientos)
class MovimientoAdmin(admin.ModelAdmin):
    list_display = ('account', 'amount', 'type', 'created_at')
    list_filter = ('account', 'amount', 'type', 'created_at')
    search_fields = ('account__account_id', 'amount', 'type', 'created_at')

