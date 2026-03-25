from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ResultsViewSet

router = DefaultRouter()
router.register(r'results', ResultsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]