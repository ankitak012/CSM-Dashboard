from rest_framework import serializers
from .models import Server
from django.utils import timezone

class ServerSerializer(serializers.ModelSerializer):
    created_on = serializers.SerializerMethodField()

    class Meta:
        model = Server
        fields = '__all__'

    def get_created_on(self, obj):
        now = timezone.now()
        delta = now - obj.created_on
        return delta.days
