import random
from datetime import datetime, timedelta
from django.shortcuts import render, get_object_or_404, redirect
from shared_models.models import Tarjeta, Cliente, Marcastarjeta
from .forms import TarjetaForm
from .serializers import TarjetaSerializer
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action

def generate_card_number(brand):
    if brand == 'AMEX' or brand == "1":
        # American Express card number starts with 34 or 37
        prefix = random.choice(['34', '37'])
        card_number = prefix + ''.join(random.choice('0123456789') for _ in range(13))
    elif brand == 'VISA' or brand == '2':
        # Visa card number starts with 4
        prefix = '4'
        card_number = prefix + ''.join(random.choice('0123456789') for _ in range(15))
    elif brand == 'MASTERCARD' or brand == '3':
        # Mastercard card number starts with 51-55
        prefix = str(random.randint(51, 55))
        card_number = prefix + ''.join(random.choice('0123456789') for _ in range(14))
    else:
        raise ValueError('Invalid card brand')

    return card_number

def generate_cvv():
    # CVV is usually a 3-digit number
    return ''.join(random.choice('0123456789') for _ in range(3))

def generate_expiration_date():
    current_date = datetime.now().date()
    variation_months = random.randint(4, 48)
    expiration_date = current_date + timedelta(days=30 * variation_months)

    # Formatea la fecha de vencimiento con barras
    expiration_date_formatted = expiration_date.strftime('%Y/%m/%d')

    return expiration_date_formatted

def tarjetas_detail(request, cliente_id):
    cliente = get_object_or_404(Cliente, customer_id=cliente_id)
    tarjetas = cliente.tarjeta_set.all()

    return render(request, 'tarjetas_detail.html', {'cliente': cliente, 'tarjetas': tarjetas})


def crear_tarjeta(request, cliente_id):
    cliente = Cliente.objects.get(customer_id=cliente_id)

    if request.method == 'POST':
        form = TarjetaForm(request.POST)
        if form.is_valid():
            nueva_tarjeta = form.save(commit=False)
            nueva_tarjeta.customer = cliente

            brand = nueva_tarjeta.marcaid.nombre

            # Obtén la fecha actual con solo el año, mes y día
            fecha_actual = datetime.now().date()

            # Formatea la fecha con barras
            fecha_formateada = fecha_actual.strftime('%Y/%m/%d')

            nueva_tarjeta.card_number = generate_card_number(brand)
            nueva_tarjeta.cvv = generate_cvv()
            nueva_tarjeta.issuance_date = fecha_formateada
            nueva_tarjeta.expiration_date = generate_expiration_date()
            nueva_tarjeta.save()
            return redirect('tarjetas_detail', cliente_id=cliente.customer_id)
    else:
        form = TarjetaForm()

    return render(request, 'crear_tarjeta.html', {'form': form, 'cliente': cliente})

class TarjetaViewSet(viewsets.ModelViewSet):
    queryset = Tarjeta.objects.all()
    serializer_class = TarjetaSerializer
    """ permission_classes = [permissions.IsAuthenticated] """
    @action(detail=False, methods=['GET'])
    def customer_cards(self, request, *args, **kwargs):
        # Obtén el ID del cliente desde los parámetros de la solicitud
        customer_id = request.query_params.get('customer_id')

        # Filtra las tarjetas basadas en el cliente
        cards = Tarjeta.objects.filter(customer=customer_id)

        # Serializa los datos y devuelve la respuesta
        serializer = TarjetaSerializer(cards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class TarjetaList(APIView):
    def post (self, request, format=None):
        serializer = TarjetaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        data = Tarjeta.objects.all().order_by('card_id')
        serializer = TarjetaSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)