from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from service.models import Service
from .serializers import ServiceSerializer

from django.views.decorators.csrf import csrf_exempt
import json
# service/views.py
from django.http import JsonResponse
from django.utils.dateparse import parse_datetime
from datetime import datetime, timedelta
from .models import Service  # adjust if needed
from django.utils.timezone import now


def get_filtered_data(request):
    filter_type = request.GET.get('filter_type')  # "month", "week", "day", "year", or "custom"
    start_date = request.GET.get('start_date')     # if custom filter selected
    end_date = request.GET.get('end_date')         # if custom filter selected

    # Load your data (replace with your real data fetching logic)
    data = get_your_data()  # assume it gives you the JSON you showed

    today = now().date()
    filtered_data = {}

    # Calculate date range based on filter
    if filter_type == "custom" and start_date and end_date:
        start = datetime.strptime(start_date, "%Y-%m-%d").date()
        end = datetime.strptime(end_date, "%Y-%m-%d").date()
    elif filter_type == "month":
        start = today.replace(day=1)
        end = today
    elif filter_type == "week":
        start = today - timedelta(days=7)
        end = today
    elif filter_type == "day":
        start = today
        end = today
    elif filter_type == "year":
        start = today.replace(month=1, day=1)
        end = today
    else:
        # Default = current month
        start = today.replace(day=1)
        end = today

    # Filter data according to start and end date
    for service_name, logs in data.items():
        filtered_logs = [
            log for log in logs
            if start <= datetime.strptime(log["date"], "%Y-%m-%d %H:%M:%S").date() <= end
        ]
        if filtered_logs:
            filtered_data[service_name] = filtered_logs

    return JsonResponse(filtered_data)



class ServiceView(APIView):
    
    
    # def get(self, request, server_id=None):
        
        
    #     if server_id:
    #         services = Service.objects.filter(server__id=server_id).order_by('-created_on')[:100]
                                    
    #         # Group services by their status
    #         # grouped_data = defaultdict(list)
            
    #         service_response_data = {
    #             'cometa_selenoid': [],
    #             'cometa_front': [],
    #             'cometa_novnc': [],
    #             'cometa_scheduler': [],
    #             'cometa_socket': [],
    #             'cometa_redis': [],
    #             'cometa_django': [],
    #             'cometa_behave': [],
    #             'cometa_postgres': [],
    #         }
                
    #         for service in services:
    #             # Parse the error JSON if it exists
    #             error_data = {}
    #             if service.error:
    #                 if isinstance(service.error, str):
    #                     try:
    #                         error_data = json.loads(service.error)
    #                     except json.JSONDecodeError:
    #                         error_data = {}
    #                 elif isinstance(service.error, dict):
    #                     error_data = service.error
                
    #             service_response_data['cometa_selenoid'].append({
    #                 "state": service.cometa_selenoid,
    #                 "error": error_data.get('cometa_selenoid', '') if not service.cometa_selenoid else "",
    #                 "date": service.created_on.strftime('%Y-%m-%d %H:%M:%S')
    #             })        
    #             service_response_data['cometa_front'].append({
    #                 "state": service.cometa_front,
    #                 "error": error_data.get('cometa_front', '') if not service.cometa_front else "",
    #                 "date": service.created_on.strftime('%Y-%m-%d %H:%M:%S')
    #             })        
    #             service_response_data['cometa_novnc'].append({
    #                 "state": service.cometa_novnc,
    #                 "error": error_data.get('cometa_novnc', '') if not service.cometa_novnc else "",
    #                 "date": service.created_on.strftime('%Y-%m-%d %H:%M:%S')
    #             })        
    #             service_response_data['cometa_scheduler'].append({
    #                 "state": service.cometa_scheduler,
    #                 "error": error_data.get('cometa_scheduler', '') if not service.cometa_scheduler else "",
    #                 "date": service.created_on.strftime('%Y-%m-%d %H:%M:%S')
    #             })        
    #             service_response_data['cometa_socket'].append({
    #                 "state": service.cometa_socket,
    #                 "error": error_data.get('cometa_socket', '') if not service.cometa_socket else "",
    #                 "date": service.created_on.strftime('%Y-%m-%d %H:%M:%S')
    #             })        
    #             service_response_data['cometa_redis'].append({
    #                 "state": service.cometa_redis,
    #                 "error": error_data.get('cometa_redis', '') if not service.cometa_redis else "",
    #                 "date": service.created_on.strftime('%Y-%m-%d %H:%M:%S')
    #             })        
    #             service_response_data['cometa_django'].append({
    #                 "state": service.cometa_django,
    #                 "error": error_data.get('cometa_django', '') if not service.cometa_django else "",
    #                 "date": service.created_on.strftime('%Y-%m-%d %H:%M:%S')
    #             })        
    #             service_response_data['cometa_behave'].append({
    #                 "state": service.cometa_behave,
    #                 "error": error_data.get('cometa_behave', '') if not service.cometa_behave else "",
    #                 "date": service.created_on.strftime('%Y-%m-%d %H:%M:%S')
    #             })        
    #             service_response_data['cometa_postgres'].append({
    #                 "state": service.cometa_postgres,
    #                 "error": error_data.get('cometa_postgres', '') if not service.cometa_postgres else "",
    #                 "date": service.created_on.strftime('%Y-%m-%d %H:%M:%S')
    #             })        
                
                
    #     return JsonResponse(service_response_data)
    #     # return Response(serializer.data)
    
    def get(self, request, server_id=None):
        filter_type = request.GET.get('filter_type', 'month')  # default: month
        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')

        if server_id:
            services = Service.objects.filter(server__id=server_id)
            # .order_by('-created_on')[:100]

            # Apply time filter
            if start_date and end_date:
                try:
                    start = datetime.strptime(start_date, '%Y-%m-%d')
                    end = datetime.strptime(end_date, '%Y-%m-%d') + timedelta(days=1)  # Include full end date
                    services = services.filter(created_on__range=(start, end))
                except ValueError:
                    pass  # Invalid date format, ignore the filter

            else:
                time_threshold = now()

                if filter_type == 'minute':
                    time_threshold -= timedelta(minutes=1)
                elif filter_type == 'hour':
                    time_threshold -= timedelta(hours=1)
                elif filter_type == 'day':
                    time_threshold -= timedelta(days=1)
                elif filter_type == 'week':
                    time_threshold -= timedelta(weeks=1)
                elif filter_type == 'month':
                    time_threshold -= timedelta(days=30)
                elif filter_type == 'year':
                    time_threshold -= timedelta(days=365)

                services = services.filter(created_on__gte=time_threshold)

            services = services.order_by('-created_on')[:100]

            # Prepare response data
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
                error_data = {}
                if service.error:
                    if isinstance(service.error, str):
                        try:
                            error_data = json.loads(service.error)
                        except json.JSONDecodeError:
                            error_data = {}
                    elif isinstance(service.error, dict):
                        error_data = service.error

                for key in service_response_data.keys():
                    service_response_data[key].append({
                        "state": getattr(service, key),
                        "error": error_data.get(key, '') if not getattr(service, key) else "",
                        "date": service.created_on.strftime('%Y-%m-%d %H:%M:%S')
                    })

        return JsonResponse(service_response_data)

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
