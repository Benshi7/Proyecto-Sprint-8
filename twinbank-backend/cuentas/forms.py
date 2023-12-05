from django import forms
from shared_models.models import Cuenta

class CuentaForm(forms.ModelForm):
    class Meta:
        model = Cuenta
        fields = ['balance', 'tipo_cuenta']