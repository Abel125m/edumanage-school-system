from rest_framework import serializers
from .models import teachers

class TeachersSerializer(serializers.ModelSerializer):
    class Meta:
        model = teachers
        fields = '__all__'