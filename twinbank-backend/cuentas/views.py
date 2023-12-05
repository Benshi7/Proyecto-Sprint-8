from django.shortcuts import render, get_object_or_404, redirect
from shared_models.models import Cliente, Cuenta, Movimientos
from .forms import CuentaForm
import random

def generar_iban():
    country_code = "ES"
    check_digits = str(random.randint(10, 99))
    bban = ''.join([str(random.randint(0, 9)) for _ in range(20)])
    iban = country_code + check_digits + bban
    return iban

# Create your views here.

def lista_cuentas(request, cliente_id):
    cliente = Cliente.objects.get(customer_id=cliente_id)
    cuentas = Cuenta.objects.filter(customer=cliente)
    return render(request, 'lista_cuentas.html', {'cliente': cliente, 'cuentas': cuentas})

def crear_cuenta_bancaria(request, cliente_id):
    cliente = Cliente.objects.get(customer_id=cliente_id)

    if request.method == 'POST':
        form = CuentaForm(request.POST)
        if form.is_valid():
            nueva_cuenta = form.save(commit=False)
            nueva_cuenta.customer = cliente
            nueva_cuenta.iban = generar_iban()
            nueva_cuenta.save()
            return redirect('cliente_detail', cliente_id=cliente.customer_id)
    else:
        form = CuentaForm()

    return render(request, 'crear_cuenta_bancaria.html', {'form': form, 'cliente': cliente})
