from rest_framework import serializers
from .models import exams

class ExamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = exams
        fields = '__all__'