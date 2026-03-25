from rest_framework import serializers
from .models import fees

class FeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = fees
        fields = '__all__'