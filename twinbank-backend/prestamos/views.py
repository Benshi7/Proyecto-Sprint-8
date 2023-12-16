from django.shortcuts import render, get_object_or_404
from shared_models.models import Prestamo, Cliente
from django.http import Http404, HttpResponse, HttpResponseBadRequest
from .serializers import PrestamoSerializer
from rest_framework import viewsets, permissions, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.decorators import action

# Create your views here.

class PrestamosViewSet(viewsets.ModelViewSet):
    queryset = Prestamo.objects.all()
    serializer_class = PrestamoSerializer

    @action(detail=False, methods=['GET'])
    def customer_loans(self, request, *args, **kwargs):
        # Obten el ID del cliente desde los parámetros de la solicitud
        customer_id = request.query_params.get('customer_id')

        # Filtra las cuentas basadas en el cliente
        loans = Prestamo.objects.filter(customer=customer_id)

        # Serializa los datos y devuelve la respuesta
        serializer = PrestamoSerializer(loans, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    @action(detail=False, methods=['GET'])
    def branch_loans(self, request, *args, **kwargs):
            # Obtén el ID de la sucursal desde los parámetros de la solicitud
            branch_id = request.query_params.get('branch_id')
            
            # Obtén los clientes de la sucursal
            clientes = Cliente.objects.filter(branch_id=branch_id)

            # Filtra los préstamos basados en los clientes
            loans = Prestamo.objects.filter(customer_id__in=clientes)

            # Serializa los datos y devuelve la respuesta
            serializer = PrestamoSerializer(loans, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    
class PrestamosList(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post (self, request, format=None):
        serializer = PrestamoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        prestamo = Prestamo.objects.all().order_by('loan_id')
        serializer = PrestamoSerializer(prestamo, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        prestamo = self.get_object(pk)
        serializer = PrestamoSerializer(prestamo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        prestamo = self.get_object(pk)
        prestamo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    