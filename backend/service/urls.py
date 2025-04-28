
from django.urls import path
from .views import ServiceView
from .views import model_count
from .views import update_service,get_filtered_data

urlpatterns = [
    path('service/',ServiceView.as_view()),
    path('service/<int:server_id>/',ServiceView.as_view()),
    path('filtered-services/', get_filtered_data, name='get_filtered_data'),
    #path('count/',model_count,name='model_count')
    path('update/',update_service,name='update_service')
]
