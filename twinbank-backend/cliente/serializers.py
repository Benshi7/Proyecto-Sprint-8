from rest_framework import serializers
from shared_models.models import Cliente, UsuarioCliente

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'
        read_only_fields = ['customer_id']

class UserSerializer(serializers.ModelSerializer):
    cliente = ClienteSerializer(required=True)

    class Meta:
        model = UsuarioCliente
        fields = '__all__'
        read_only_fields = ['customer_id'] 