from rest_framework import viewsets
from .models import exams
from .serializers import ExamsSerializer

class ExamsViewSet(viewsets.ModelViewSet):
    queryset = exams.objects.all()
    serializer_class = ExamsSerializer
