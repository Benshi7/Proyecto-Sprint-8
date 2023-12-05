from django import forms
from shared_models.models import Cuenta

class SolicitudPrestamoForm(forms.Form):
    TIPOS_DE_PRESTAMO_CHOICES = [
        ('HIPOTECARIO', 'Hipotecario'),
        ('PERSONAL', 'Personal'),
        ('PRENDARIO', 'Prendario'),
    ]
    loan_type = forms.ChoiceField(label='Tipo de préstamo', choices=TIPOS_DE_PRESTAMO_CHOICES)
    loan_date = forms.DateField(label='Fecha de solicitud', widget=forms.TextInput(attrs={'type': 'date'}))
    loan_total = forms.IntegerField(label='Monto solicitado')
    def __init__(self, *args, **kwargs):
        cliente_id = kwargs.pop('cliente_id', None)
        super(SolicitudPrestamoForm, self).__init__(*args, **kwargs)
        if cliente_id:
            self.fields['cuentas'].queryset = Cuenta.objects.filter(customer__customer_id=cliente_id)

    cuentas = forms.ModelChoiceField(
        label='Cuenta',
        queryset=Cuenta.objects.none(),
        empty_label=None  # You can customize this based on your needs
    )