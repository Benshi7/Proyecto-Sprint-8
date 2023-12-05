from django.contrib import admin
from shared_models.models import Tarjeta, Marcastarjeta
# Register your models here.

@admin.register(Tarjeta)
class TarjetaAdmin(admin.ModelAdmin):
    list_display = ('card_id', 'card_number', 'cvv', 'issuance_date', 'expiration_date', 'card_type', 'marcaid', 'customer')
    list_filter = ('card_id', 'card_number', 'cvv', 'issuance_date', 'expiration_date', 'card_type', 'marcaid', 'customer')
    search_fields = ('card_number', 'cvv', 'issuance_date', 'expiration_date', 'card_type', 'marcaid__nombre')

    def issuance_date_formatted(self, obj):
        return obj.issuance_date.strftime('%m/%y') if obj.issuance_date else ''
    issuance_date_formatted.short_description = 'Issuance Date'

    def expiration_date_formatted(self, obj):
        return obj.expiration_date.strftime('%m/%y') if obj.expiration_date else ''
    expiration_date_formatted.short_description = 'Expiration Date'

@admin.register(Marcastarjeta)
class MarcastarjetaAdmin(admin.ModelAdmin):
    list_display = ('marcaid', 'nombre')
    list_filter = ('nombre',)
    search_fields = ('nombre',)
