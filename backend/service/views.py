from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from service.models import Service
from .serializers import ServiceSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


class ServiceView(APIView):
    
    def get(self, request, server_id=None):
        if server_id:
            services = Service.objects.filter(server__id=server_id).order_by('-created_on')
                                    
            # Group services by their status
            # grouped_data = defaultdict(list)
            
            service_response_data = {
                'cometa_selenoid': [],
                'cometa_front': [],
                'cometa_novnc': [],
                'cometa_scheduler': [],
                'cometa_socket': [],
                'cometa_redis': [],
                'cometa_django': [],
                'cometa_behave': [],
                'cometa_postgres': [],
            }
                
            for service in services:
                # Parse the error JSON if it exists
                error_data = {}
                if service.error:
                    if isinstance(service.error, str):
                        try:
                            error_data = json.loads(service.error)
                        except json.JSONDecodeError:
                            error_data = {}
                    elif isinstance(service.error, dict):
                        error_data = service.error
                
                service_response_data['cometa_selenoid'].append({
                    "state": service.cometa_selenoid,
                    "error": error_data.get('cometa_selenoid', '') if not service.cometa_selenoid else "",
                    "date": service.created_on.strftime('%Y-%m-%d %H:%M:%S')
                })        
                service_response_data['cometa_front'].append({
                    "state": service.cometa_front,
                    "error": error_data.get('cometa_front', '') if not service.cometa_front else "",
                    "date": service.created_on.strftime('%Y-%m-%d %H:%M:%S')
                })        
                service_response_data['cometa_novnc'].append({
                    "state": service.cometa_novnc,
                    "error": error_data.get('cometa_novnc', '') if not service.cometa_novnc else "",
                    "date": service.created_on.strftime('%Y-%m-%d %H:%M:%S')
                })        
                service_response_data['cometa_scheduler'].append({
                    "state": service.cometa_scheduler,
                    "error": error_data.get('cometa_scheduler', '') if not service.cometa_scheduler else "",
                    "date": service.created_on.strftime('%Y-%m-%d %H:%M:%S')
                })        
                service_response_data['cometa_socket'].append({
                    "state": service.cometa_socket,
                    "error": error_data.get('cometa_socket', '') if not service.cometa_socket else "",
                    "date": service.created_on.strftime('%Y-%m-%d %H:%M:%S')
                })        
                service_response_data['cometa_redis'].append({
                    "state": service.cometa_redis,
                    "error": error_data.get('cometa_redis', '') if not service.cometa_redis else "",
                    "date": service.created_on.strftime('%Y-%m-%d %H:%M:%S')
                })        
                service_response_data['cometa_django'].append({
                    "state": service.cometa_django,
                    "error": error_data.get('cometa_django', '') if not service.cometa_django else "",
                    "date": service.created_on.strftime('%Y-%m-%d %H:%M:%S')
                })        
                service_response_data['cometa_behave'].append({
                    "state": service.cometa_behave,
                    "error": error_data.get('cometa_behave', '') if not service.cometa_behave else "",
                    "date": service.created_on.strftime('%Y-%m-%d %H:%M:%S')
                })        
                service_response_data['cometa_postgres'].append({
                    "state": service.cometa_postgres,
                    "error": error_data.get('cometa_postgres', '') if not service.cometa_postgres else "",
                    "date": service.created_on.strftime('%Y-%m-%d %H:%M:%S')
                })        
                
                
        return JsonResponse(service_response_data)
        # return Response(serializer.data)

    def post(self, request):
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        service = get_object_or_404(Service, pk=pk)
        serializer = ServiceSerializer(service, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        service = get_object_or_404(Service, pk=pk)
        service.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
@csrf_exempt
def model_count(request):
        count = Service.objects.count()
        return JsonResponse({'count':count})
    

def update_service(request):
    obj = Service.objects.get(id=194)

    # Update fields
    obj.cometa_selenoid = True
    obj.cometa_front = True
    obj.cometa_novnc = True
    obj.cometa_scheduler = True
    obj.cometa_socket = True
    obj.cometa_redis = True
    obj.cometa_django = True
    obj.cometa_behave = True
    obj.cometa_postgres = True
    obj.upCount = 9
    obj.downCount = 0

    # Save changes
    obj.save(update_fields=[
        "cometa_selenoid", "cometa_front", "cometa_novnc", "cometa_scheduler",
        "cometa_socket", "cometa_redis", "cometa_django", "cometa_behave",
        "cometa_postgres", "upCount", "downCount"
    ])

    return JsonResponse({"message": "✅ Service updated successfully!"})
