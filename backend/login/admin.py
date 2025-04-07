from django.contrib import admin
from .models import CustomUser

class UserAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'email', 'is_admin', 'is_active')
    list_filter = ('user_name', 'email', 'is_admin', 'is_active')
    search_fields = ('user_name', 'email')
    ordering = ('user_name',)

# Register your models here.
admin.site.register(CustomUser, UserAdmin)   