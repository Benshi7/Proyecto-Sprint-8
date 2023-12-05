from django import forms
from django.contrib.auth.forms import UserCreationForm
from shared_models.models import UsuarioCliente

class RegistroForm(UserCreationForm):
    dni = forms.CharField(max_length=15, help_text='Ingrese su DNI')

    class Meta:
        model = UsuarioCliente
        fields = ('username', 'dni','email', 'password1', 'password2')

class NewRegistroForm(UserCreationForm):
    customer_name = forms.CharField(max_length=30, required=True, label="Nombre")
    customer_surname = forms.CharField(max_length=30, required=True, label="Apellido")
    customer_dni = forms.CharField(max_length=20, required=True, label="DNI")
    dob = forms.DateField(required=False, widget=forms.TextInput(attrs={'type': 'date'}), label="Fecha de nacimiento")
    branch_id = forms.IntegerField(required=True, label ="Sucursal")

    class Meta:
        model = UsuarioCliente
        fields = ['username', 'password1', 'password2', 'customer_name', 'customer_surname', 'customer_dni', 'dob', 'branch_id', 'tipoclienteid']