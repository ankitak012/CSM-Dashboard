from django.http import JsonResponse
from service.models import Service  # Make sure to import from the correct app

def update_service(request):
    try:
        # Read the last stored service ID
        with open("last_service_id.txt", "r") as file:
            service_id = file.read().strip()  # Read and remove extra spaces

        if not service_id.isdigit():
            return JsonResponse({"error": "⚠️ Invalid service ID!"})

        # Convert to integer
        service_id = int(service_id)

        # Fetch the service from the database
        try:
            obj = Service.objects.get(id=service_id)
        except Service.DoesNotExist:
            return JsonResponse({"error": f"❌ Service with ID {service_id} not found!"})

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

        return JsonResponse({"message": f"✅ Service {service_id} updated successfully!"})

    except Exception as e:
        return JsonResponse({"error": f"❌ Error: {e}"})
