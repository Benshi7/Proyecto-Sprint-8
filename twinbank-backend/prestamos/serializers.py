from rest_framework import serializers
from shared_models.models import Prestamo

class PrestamoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestamo
        fields = '__all__'
        read_only_fields = ['loan_id']
