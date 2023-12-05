from rest_framework import serializers
from shared_models.models import Cliente

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'
        read_only_fields = ['customer_id']