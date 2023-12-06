from rest_framework import serializers
from shared_models.models import Tarjeta

class TarjetaSerializer(serializers.ModelSerializer):
    card_number = serializers.CharField()

    class Meta:
        model = Tarjeta
        fields = '__all__'
        read_only_fields = ['card_id']
