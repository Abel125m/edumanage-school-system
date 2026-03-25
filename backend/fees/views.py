from rest_framework import viewsets
from .models import fees
from .serializers import FeesSerializer

class FeesViewSet(viewsets.ModelViewSet):
    queryset = fees.objects.all()
    serializer_class = FeesSerializer
