from django.contrib import admin
from .models import Server  

class ServerAdmin(admin.ModelAdmin):
    list_display = ('id', 'server_name', 'server_secret_name',  'created_on')

# Register your models here.
admin.site.register(Server, ServerAdmin)
