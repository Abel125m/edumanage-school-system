from rest_framework import viewsets
from .models import Results
from .serializers import ResultsSerializer

class ResultsViewSet(viewsets.ModelViewSet):
    queryset = Results.objects.all()
    serializer_class = ResultsSerializer
