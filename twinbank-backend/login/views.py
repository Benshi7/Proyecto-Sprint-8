from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout
from django.views import View
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from shared_models.models import Cliente
from .forms import RegistroForm, NewRegistroForm

# Create your views here.

class RegisterView(View):
    def get(self, request):
        form = RegistroForm()
        return render(request, 'register_basic.html', {'form': form})

    def post(self, request):
        form = RegistroForm(request.POST)
        if form.is_valid():
            usuario = form.save(commit=False)  # Evitamos guardar el usuario antes de personalizarlo

            dni = form.cleaned_data['dni']
            cliente = Cliente.objects.get(customer_dni=dni)

            # Asignamos el cliente al usuario y luego guardamos el usuario
            usuario.cliente = cliente
            usuario.first_name = cliente.customer_name
            usuario.last_name = cliente.customer_surname
            usuario.save()

            login(request, usuario)
            return redirect('home')
        return render(request, 'register_basic.html', {'form': form})

class RegisterAndCreateView(View):
    def get(self, request):
        form = NewRegistroForm()
        return render(request, 'register_full.html', {'form': form})

    def post(self, request):
        form = NewRegistroForm(request.POST)
        if form.is_valid():
            dni = form.cleaned_data['customer_dni']

            cliente, created = Cliente.objects.get_or_create(customer_dni=dni, defaults={
                'customer_name': form.cleaned_data['customer_name'],
                'customer_surname': form.cleaned_data['customer_surname'],
                'dob': form.cleaned_data['dob'],
                'branch_id': form.cleaned_data['branch_id'],
                'tipoclienteid': form.cleaned_data['tipoclienteid'],
                # Otros campos del cliente que debes incluir aquí
            })

            usuario = form.save(commit=False)
            usuario.cliente = cliente
            usuario.first_name = cliente.customer_name
            usuario.last_name = cliente.customer_surname
            usuario.save()

            login(request, usuario)
            print("Formulario válido. Redirigiendo...")
            return redirect('home')

        return render(request, 'register_full.html', {'form': form})

class LoginView(View):
  def get(self, request):
    form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

  def post(self, request):
    form = AuthenticationForm(data=request.POST)
    if form.is_valid():
      user = form.get_user()
      login(request, user)
      return redirect('home')
    return render(request, 'clientes_list.html', {'form': form})

class LogoutView(View):
  def get(self, request):
    logout(request)
    return redirect('home')

class HomeView(TemplateView):
  template_name = 'home.html'