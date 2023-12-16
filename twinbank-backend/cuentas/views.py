from django.shortcuts import render, get_object_or_404, redirect
from shared_models.models import Cliente, Cuenta, Movimientos
from .forms import CuentaForm
import random
from .serializers import CuentaSerializer
from rest_framework.authentication import BasicAuthentication
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from django.views.decorators.csrf import csrf_exempt
from django.http import Http404


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
    authentication_classes = [BasicAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = Cuenta.objects.all()
    serializer_class = CuentaSerializer

    @action(detail=False, methods=['GET'])
    def customer_accounts(self, request, *args, **kwargs):
        # Obten el ID del cliente desde los parámetros de la solicitud
        customer_id = request.query_params.get('customer_id')

        # Filtra las cuentas basadas en el cliente
        accounts = Cuenta.objects.filter(customer=customer_id)

        # Serializa los datos y devuelve la respuesta
        serializer = CuentaSerializer(accounts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['PUT'])
    def update_balance(self, request, *args, **kwargs):
        # Obten el ID de la cuenta desde los parámetros de la solicitud
        account_id = request.query_params.get('account_id')

        # Obten la cuenta basada en el ID
        account = Cuenta.objects.get(account_id=account_id)

        # Actualiza el balance de la cuenta
        account.balance = request.data.get('balance')
        account.save()

        # Serializa los datos y devuelve la respuesta
        serializer = CuentaSerializer(account)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

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
    
class CuentaDetail(APIView):
    def get_object(self, pk):
        try:
            return Cuenta.objects.get(pk=pk)
        except Cuenta.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        cuenta = self.get_object(pk)
        serializer = CuentaSerializer(cuenta)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        cuenta = self.get_object(pk)
        serializer = CuentaSerializer(cuenta, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        cuenta = self.get_object(pk)
        cuenta.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
 