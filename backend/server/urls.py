from django.urls import path
from .views import ServerView

urlpatterns = [
    path('server/', ServerView.as_view(),name='create-server'),
    path('server/<str:pk>/', ServerView.as_view())
]

