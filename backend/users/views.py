from rest_framework import viewsets
from .models import users
from .serializers import UsersSerializer

class UsersViewSet(viewsets.ModelViewSet):
    queryset = users.objects.all()
    serializer_class = UsersSerializer
