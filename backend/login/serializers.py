from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'user_name', 'email', 'email_password', 'user_password', 'is_active', 'is_admin']
        extra_kwargs = {'user_password': {'write_only': True}}  # Hide password in responses
    
    def create(self, validated_data):
        user_password = validated_data.pop('user_password', None)
        user = User(**validated_data)
        if user_password:
            user.set_password(user_password)  # Hash user_password before saving
        user.save()
        return user
