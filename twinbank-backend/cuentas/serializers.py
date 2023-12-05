from rest_framework import serializers
from shared_models.models import Cuenta

class CuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuenta
        fields = '__all__'
        read_only_fields = ['account_id']