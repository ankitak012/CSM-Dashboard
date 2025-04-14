from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from service.models import Service
from .serializers import ServiceSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


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
                service_response_data['cometa_selenoid'].append({
                    "state": service.cometa_selenoid,
                    "error": service.error if service.error else "",
                    "date": service.created_on.strftime('%Y-%m-%d %H:%M:%S')
                })        
                service_response_data['cometa_front'].append({
                    "state":service.cometa_front,
                    "date":service.created_on.strftime('%Y-%m-%d %H:%M:%S')
                    })        
                service_response_data['cometa_novnc'].append({
                    "state":service.cometa_novnc,
                    "date":service.created_on.strftime('%Y-%m-%d %H:%M:%S')
                    })        
                service_response_data['cometa_scheduler'].append({
                    "state":service.cometa_scheduler,
                    "date":service.created_on.strftime('%Y-%m-%d %H:%M:%S')
                    })        
                service_response_data['cometa_socket'].append({
                    "state":service.cometa_socket,
                    "date":service.created_on.strftime('%Y-%m-%d %H:%M:%S')
                    })        
                service_response_data['cometa_redis'].append({
                    "state":service.cometa_redis,
                    "date":service.created_on.strftime('%Y-%m-%d %H:%M:%S')
                    })        
                service_response_data['cometa_django'].append({
                    "state":service.cometa_django,
                    "date":service.created_on.strftime('%Y-%m-%d %H:%M:%S')
                    })        
                service_response_data['cometa_behave'].append({
                    "state":service.cometa_behave,
                    "date":service.created_on.strftime('%Y-%m-%d %H:%M:%S')
                    })        
                service_response_data['cometa_postgres'].append({
                    "state":service.cometa_postgres,
                    "date":service.created_on.strftime('%Y-%m-%d %H:%M:%S')
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
