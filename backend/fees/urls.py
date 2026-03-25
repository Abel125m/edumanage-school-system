from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FeesViewSet

router = DefaultRouter()
router.register(r'fees', FeesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]