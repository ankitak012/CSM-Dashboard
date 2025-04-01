from django.urls import path
from .views import UserAPIView

urlpatterns = [
    path('users/', UserAPIView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserAPIView.as_view(), name='user-detail'),
]
