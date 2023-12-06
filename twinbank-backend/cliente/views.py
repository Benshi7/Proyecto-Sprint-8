from django.shortcuts import render, get_object_or_404, redirect
from .serializers import ClienteSerializer, UserSerializer
from django.contrib import messages
from shared_models.models import Cliente, Tiposcliente, Prestamo, UsuarioCliente
from .forms import SolicitudPrestamoForm
from django.http import Http404, HttpResponse, HttpResponseBadRequest
from rest_framework import viewsets, permissions, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import json

# Create your views here.

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            # Obtén las credenciales del cuerpo de la solicitud JSON
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username')
            password = data.get('password')

            # Lógica de autenticación utilizando authenticate
            user = authenticate(request, username=username, password=password)

            if user is not None:
                # Autenticación exitosa
                login(request, user)
                return JsonResponse({
                    'message': 'Autenticación exitosa',
                    'username': user.username,
                })
            else:
                # Credenciales incorrectas
                return JsonResponse({'error': 'Credenciales incorrectas'}, status=400)

        except Exception as e:
            # Manejo de otras excepciones
            return JsonResponse({'error': str(e)}, status=400)

    else:
        # Método no permitido para otras solicitudes que no sean POST
        return JsonResponse({'error': 'Método no permitido'}, status=405)



def home(request):
  return render(request, 'home.html')

def tiposcliente_list(request):
    tipos = Tiposcliente.objects.all()
    return render(request, 'tiposcliente_list.html', {'tipos': tipos})

def cliente_list(request):
    clientes = Cliente.objects.all()
    return render(request, 'cliente_list.html', {'clientes': clientes})

def cliente_detail(request, cliente_id):
    cliente = get_object_or_404(Cliente, customer_id=cliente_id)

    return render(request, 'cliente_detail.html', {'cliente': cliente})

def solicitud_prestamo(request, cliente_id):
    template_name = 'solicitud_prestamo.html'

    cliente = Cliente.objects.get(customer_id=cliente_id)
    limite_prestamos = int(cliente.tipoclienteid.limite_prestamos)

    if request.method == 'GET':
        form = SolicitudPrestamoForm(cliente_id=cliente_id)
        return render(request, template_name, {'form': form, 'cliente_id': cliente_id})

    elif request.method == 'POST':
        form = SolicitudPrestamoForm(request.POST, cliente_id=cliente_id)

        if form.is_valid():
            # Guardar la solicitud de préstamo en la base de datos

            if limite_prestamos < form.cleaned_data['loan_total']:
                error_mensaje = 'El monto solicitado supera el límite de préstamos para este tipo de cliente.'
                messages.error(request, error_mensaje)
                return render(request, template_name, {'form': form, 'cliente_id': cliente_id, 'error': error_mensaje})

            cuenta = form.cleaned_data['cuentas']
            prestamo = Prestamo(
                loan_type=form.cleaned_data['loan_type'],
                loan_date=form.cleaned_data['loan_date'],
                loan_total=form.cleaned_data['loan_total'],
                customer_id=cliente_id, # Asumiendo que 'customer' es un campo ForeignKey en tu modelo Prestamo
            )
            prestamo.save()
            cuenta.balance += form.cleaned_data['loan_total']
            cuenta.save()
            messages.success(request, 'La solicitud de préstamo ha sido enviada con éxito.')
            return redirect('solicitud_prestamo', cliente_id=cliente_id)  # Redirigir a la página de inicio o a donde desees

    return render(request, template_name, {'form': form, 'cliente_id': cliente_id})

def listar_prestamos(request, cliente_id):
    prestamos = Prestamo.objects.filter(customer_id=cliente_id)
    return render(request, 'listar_prestamos.html', {'prestamos': prestamos})

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    """ permission_classes = [permissions.IsAuthenticated] """

class ClienteList(APIView):
    def post (self, request, format=None):
        serializer = ClienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        data = Cliente.objects.all().order_by('customer_id')
        serializer = ClienteSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        cliente = self.get_object(pk)
        serializer = ClienteSerializer(cliente, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        cliente = self.get_object(pk)
        cliente.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserList(generics.ListAPIView):
    queryset = UsuarioCliente.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = UsuarioCliente.objects.all()
    serializer_class = UserSerializer