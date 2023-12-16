from django.shortcuts import render, get_object_or_404, redirect
from .serializers import ClienteSerializer, UserSerializer, SucursalSerializer
from django.contrib import messages
from shared_models.models import Cliente, Tiposcliente, Prestamo, UsuarioCliente, Empleado, Sucursal, Cuenta, TipoCuenta
from .forms import SolicitudPrestamoForm
from django.http import Http404, HttpResponse, HttpResponseBadRequest
from rest_framework import viewsets, permissions, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from django.contrib.auth import authenticate, login, get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import json, random

# Create your views here.
def generar_iban():
    country_code = "ES"
    check_digits = str(random.randint(10, 99))
    bban = ''.join([str(random.randint(0, 9)) for _ in range(20)])
    iban = country_code + check_digits + bban
    return iban


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username')
            password = data.get('password')

            user = authenticate(request, username=username, password=password)

            if user is not None:
                # Autenticación exitosa
                login(request, user)
                return JsonResponse({
                    'message': 'Autenticación exitosa',
                    'username': user.username,
                    'fotoUrl': user.fotoUrl,
                    'id': user.cliente_id,
                    'esEmpleado': user.esEmpleado,
                    'empleado_id': user.empleado_id,
                })
            else:
                return JsonResponse({'error': 'Credenciales incorrectas'}, status=400)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)


@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            registration_type= data.get('registrationType')

            if registration_type == 'existingClient':
                return register_existing_client(data)

            elif registration_type == 'newClient':
                return register_new_client(data)

            elif registration_type == 'existingEmployee':
                return register_existing_employee(data)

            else:
                return JsonResponse({'error': 'Tipo de registro no válido'}, status=400)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)

def register_existing_client(data):
    username = data.get('username')
    password = data.get('password')
    customer_dni = data.get('dni')

    if not username or not password or not customer_dni:
        return JsonResponse({'error': 'Campos obligatorios faltantes'}, status=400)

    try:
        # Acá busco los clientes que tengan el dni que me pasaron
        cliente_existente = Cliente.objects.get(customer_dni=customer_dni)

        User = get_user_model()
        user = User.objects.create_user(username=username, password=password)

        user.cliente = cliente_existente
        user.first_name = cliente_existente.customer_name
        user.last_name = cliente_existente.customer_surname

        # Agregar tipo_cliente y esEmpleado al usuario
        user.tipoclienteid = cliente_existente.tipoclienteid
        user.esEmpleado = False

        user.save()

        return JsonResponse({'message': 'Registro exitoso para cliente existente'})

    except Cliente.DoesNotExist:
        return JsonResponse({'error': 'Cliente no encontrado'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

def register_new_client(data):
    try:
        username = data.get('username')
        password = data.get('password')
        customer_name = data.get('name')
        customer_surname = data.get('lastname')
        customer_dni = data.get('dni')
        dob = data.get('birthdate')
        tipo_cuenta = data.get('clientType')
        branch_id = data.get('branch')

        # Validar campos obligatorios
        if not username or not password or not customer_name or not customer_surname or not customer_dni or not dob or not tipo_cuenta or not branch_id:
            return JsonResponse({'error': 'Campos obligatorios faltantes'}, status=400)

        if tipo_cuenta is None:
            return JsonResponse({'error': 'Tipo de cuenta no válido'}, status=400)
        try:
            branch_id = int(branch_id)
        except ValueError:
            return JsonResponse({'error': 'El ID de sucursal debe ser un número entero'}, status=400)

        User = get_user_model()
        user = User.objects.create_user(username=username, password=password)

        try:
            tipo_cliente = Tiposcliente.objects.get(pk=tipo_cuenta)
        except Tiposcliente.DoesNotExist:
            return JsonResponse({'error': 'Tipo de cuenta no encontrado'}, status=400)

        # Create or update associated cliente
        cliente, created = Cliente.objects.get_or_create(customer_dni=customer_dni, defaults={
            'customer_name': customer_name,
            'customer_surname': customer_surname,
            'dob': dob,
            'branch_id': branch_id,
            'tipoclienteid': tipo_cliente,  # Assign the Tiposcliente instance
            # Other fields of the cliente that you need to include here
        })

        # Asignar cliente al usuario
        user.cliente = cliente
        user.first_name = cliente.customer_name
        user.last_name = cliente.customer_surname

        # Agregar tipo_cliente y esEmpleado al usuario
        user.tipoclienteid = tipo_cliente  # Ajusta esto según tu modelo
        user.esEmpleado = False  # Este valor se asume para clientes

        user.save()

        tipo_cuenta = TipoCuenta.objects.get(pk=1)

        # Crear automáticamente una cuenta bancaria asociada al cliente
        nueva_cuenta = Cuenta.objects.create(
            customer=cliente,
            iban=generar_iban(),
            balance=0,
            tipo_cuenta=tipo_cuenta
            # ... (otros campos de la cuenta que necesitas incluir)
        )
        if user is not None:
            # Autenticación exitosa
            login(data, user)
            return JsonResponse({
                'message': 'Autenticación exitosa',
                'username': user.username,
                'fotoUrl': user.fotoUrl,
                'id': user.cliente_id,
                'esEmpleado': user.esEmpleado,
            })

        return JsonResponse({'message': 'Registro exitoso para cliente nuevo'})

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


def register_existing_employee(data):
    username = data.get('username')
    password = data.get('password')
    dni = data.get('dni')

    if not username or not password or not dni:
        return JsonResponse({'error': 'Campos obligatorios faltantes'}, status=400)

    try:
        # Buscar empleado existente por DNI
        empleado_existente = Empleado.objects.get(employee_dni=dni)

        # Crear usuario sin autenticación
        User = get_user_model()
        user = User.objects.create_user(username=username, password=password)

        # Asignar empleado al usuario
        user.empleado = empleado_existente
        user.esEmpleado = True  # Ya que es un empleado se lo ponemos en True
        user.save()

        return JsonResponse({'message': 'Registro exitoso para empleado existente'})

    except Empleado.DoesNotExist:
        return JsonResponse({'error': 'Empleado no encontrado'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

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
    permission_classes = [permissions.IsAuthenticated]
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
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class UserDetail(generics.RetrieveAPIView):
    queryset = UsuarioCliente.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class RetrieveCustomer(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, customer_id, format=None):
        # Retrieve the Cliente object with the specified customer_id
        cliente = get_object_or_404(Cliente, customer_id=customer_id)

        # Serialize the Cliente object
        serializer = ClienteSerializer(cliente)

        # Return the serialized data as JSON response
        return Response(serializer.data, status=status.HTTP_200_OK)

class SucursalList(generics.ListAPIView):
    queryset = Sucursal.objects.all()
    serializer_class = SucursalSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]