from django.contrib import admin
from shared_models.models import Prestamo
# Register your models here.

@admin.register(Prestamo)
class PrestamoAdmin(admin.ModelAdmin):
    list_display = ('loan_id', 'loan_type', 'loan_date', 'loan_total', 'customer')
    list_filter = ('loan_id', 'loan_type', 'loan_date', 'loan_total', 'customer')
    search_fields = ('loan_id', 'loan_type', 'loan_date', 'loan_total', 'customer__customer_name', 'customer__customer_surname', 'customer__customer_dni')
    list_per_page = 10