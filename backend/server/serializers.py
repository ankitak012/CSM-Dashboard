from rest_framework import serializers
from .models import Server
from django.utils import timezone

class ServerSerializer(serializers.ModelSerializer):
    created_on = serializers.SerializerMethodField()

    class Meta:
        model = Server
        fields = '__all__'
        
    def validate_emails(self, value):
        cleaned = [email.strip() for email in value if email.strip()]
        if len(cleaned) != len(set(cleaned)):
            raise serializers.ValidationError("Duplicate emails are not allowed for the same server.")
        return cleaned

    def get_created_on(self, obj):
        now = timezone.now()
        delta = now - obj.created_on
        return delta.days
    
    def get_emails(self, obj):
        return ';'.join(obj.emails) if isinstance(obj.emails, list) else obj.emails
