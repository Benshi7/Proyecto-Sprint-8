from django.shortcuts import render, get_object_or_404, redirect
from shared_models.models import Cliente, Cuenta, Movimientos
from .forms import CuentaForm
import random
from .serializers import CuentaSerializer
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

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

class CuentaViewSet(viewsets.ModelViewSet):
    queryset = Cuenta.objects.all()
    serializer_class = CuentaSerializer
    """ permission_classes = [permissions.IsAuthenticated] """

class CuentaList(APIView):
    def post (self, request, format=None):
        serializer = CuentaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        data = Cuenta.objects.all().order_by('account_id')
        serializer = CuentaSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)