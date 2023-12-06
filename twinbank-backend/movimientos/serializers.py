from rest_framework import serializers
from shared_models.models import Movimientos

class MovimientosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movimientos
        fields = '__all__'
        read_only_fields = ['id']