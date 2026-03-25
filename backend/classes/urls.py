from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClassesViewSet

router = DefaultRouter()
router.register(r'classes', ClassesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]