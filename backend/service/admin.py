from django.contrib import admin
from .models import Service


# Register your models here.
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('server', 'created_on', 'cometa_selenoid', 'cometa_front', 'cometa_novnc', 'cometa_scheduler', 'cometa_socket', 'cometa_postgres', 'cometa_behave', 'cometa_django', 'cometa_redis')
    list_filter = ('server',)
    search_fields = ('server', )
    ordering = ('-created_on',)

admin.site.register(Service, ServiceAdmin)


