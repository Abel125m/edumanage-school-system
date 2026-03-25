from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExamsViewSet

router = DefaultRouter()
router.register(r'exams', ExamsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]