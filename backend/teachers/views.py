from rest_framework import viewsets
from .models import teachers
from .serializers import TeachersSerializer

class TeachersViewSet(viewsets.ModelViewSet):
    queryset = teachers.objects.all()
    serializer_class = TeachersSerializer
