from rest_framework import serializers
from shared_models.models import Empleado

class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = '__all__'
        read_only_fields = ['employee_id']
        