from django.shortcuts import render, get_object_or_404
from shared_models.models import Cliente, Cuenta, Movimientos

def movimientos_detail(request, cliente_id, cuenta_id):
    cliente = get_object_or_404(Cliente, customer_id=cliente_id)
    cuenta = get_object_or_404(Cuenta, account_id=cuenta_id)
    movimientos = Movimientos.objects.filter(account=cuenta)
    return render(request, 'movimientos_detail.html', {'cliente': cliente, 'cuenta': cuenta, 'movimientos': movimientos})