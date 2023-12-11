from django.shortcuts import render
from rest_framework import viewsets
from .serializers import EmpleadoSerializer
from shared_models.models import Empleado
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework import permissions

# Create your views here.
class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer
    """permission_classes = [permissions.IsAuthenticated]"""

class EmpleadoList(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, format=None):
        empleados = Empleado.objects.all()
        serializer = EmpleadoSerializer(empleados, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = EmpleadoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors,status=400)
    
class RetrieveEmpleado(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, employee_id, format=None):
        # Retrieve the Empleado object with the specified employee_id
        empleado = get_object_or_404(Empleado, employee_id=employee_id)

        # Serialize the Empleado object
        serializer = EmpleadoSerializer(empleado)

        # Return the serialized data as JSON response
        return Response(serializer.data, status=status.HTTP_200_OK)