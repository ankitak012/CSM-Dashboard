from rest_framework import serializers
from service.models import Service
from server.models import Server

class ServiceSerializer(serializers.ModelSerializer):
    server_name = serializers.CharField(source='server.server_name', read_only=True)
    
    
    
    class Meta:
        model = Service
        fields = ['id', 'server', 'server_name', 'cometa_selenoid','cometa_front','cometa_novnc','cometa_scheduler','cometa_socket','cometa_redis','cometa_django',
                  'cometa_behave','cometa_postgres','created_on','error', 'upCount', 'downCount']
        
   

    # def validate_service_name(self, value):
    #     if not value:
    #         raise serializers.ValidationError("Service name is required.")
    #     return value