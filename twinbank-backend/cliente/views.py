from django.shortcuts import render, get_object_or_404, redirect
from rest_framework import viewsets, permissions
from .serializers import ClienteSerializer
from django.contrib import messages
from shared_models.models import Cliente, Tiposcliente, Prestamo
from .forms import SolicitudPrestamoForm

# Create your views here.

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