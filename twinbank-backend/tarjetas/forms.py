from django import forms
from shared_models.models import Tarjeta
from django.core.exceptions import ValidationError
from datetime import datetime


class TarjetaForm(forms.ModelForm):
    class Meta:
        model = Tarjeta
        fields = ['card_type', 'marcaid']
        widgets = {
            'cvv': forms.TextInput(attrs={'type': 'number'}),
            'card_number': forms.TextInput(attrs={'type': 'number'}),
            'card_type': forms.Select(choices=[('Credit', 'Credit'), ('Debit', 'Debit')]),
            'issuance_date': forms.DateField(input_formats=['%m/%y']),
            'expiration_date': forms.DateField(input_formats=['%m/%y'])
        }

    def clean_cvv(self):
        cvv = self.cleaned_data['cvv']
        if cvv is not None and not str(cvv).isdigit():
            raise forms.ValidationError('El CVV debe contener solo dígitos.')
        return cvv

    def clean_card_number(self):
        card_number = self.cleaned_data['card_number']
        if card_number is not None and not str(card_number).isdigit():
            raise forms.ValidationError('El número de tarjeta debe contener solo dígitos.')
        return card_number



""" class TarjetaForm(forms.ModelForm):
    class Meta:
        model = Tarjeta
        fields = ['card_number', 'cvv', 'issuance_date', 'expiration_date', 'card_type', 'marcaid']
        widgets = {
            'card_type': forms.TextInput(),
        } """
