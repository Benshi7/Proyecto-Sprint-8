from django.shortcuts import render, get_object_or_404
from shared_models.models import Cliente, Cuenta, Movimientos
from django.http import Http404, HttpResponse, HttpResponseBadRequest
from .serializers import MovimientosSerializer
from rest_framework import viewsets, permissions, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST


def movimientos_detail(request, cliente_id, cuenta_id):
    cliente = get_object_or_404(Cliente, customer_id=cliente_id)
    cuenta = get_object_or_404(Cuenta, account_id=cuenta_id)
    movimientos = Movimientos.objects.filter(account=cuenta)
    return render(request, 'movimientos_detail.html', {'cliente': cliente, 'cuenta': cuenta, 'movimientos': movimientos})

class MovimientosViewSet(viewsets.ModelViewSet):
    queryset = Movimientos.objects.all()
    serializer_class = MovimientosSerializer
    """ permission_classes = [permissions.IsAuthenticated] """

class MovimientosList(APIView):
    def post (self, request, format=None):
        serializer = MovimientosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        movimiento = Movimientos.objects.all().order_by('id')
        serializer = MovimientosSerializer(movimiento, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        movimiento = self.get_object(pk)
        serializer = MovimientosSerializer(movimiento, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        movimiento = self.get_object(pk)
        movimiento.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)