from django.urls import path
from .views import ServerView

urlpatterns = [
    path('server/', ServerView.as_view()),
    path('server/<str:pk>/', ServerView.as_view())
]

