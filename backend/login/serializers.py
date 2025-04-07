from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.hashers import check_password

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    user_password = serializers.CharField()

    def validate(self, data):
        email = data.get("email")
        password = data.get("user_password")

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password")

        if not check_password(password, user.user_password):
            raise serializers.ValidationError("Invalid email or password")

        if not user.is_active:
            raise serializers.ValidationError("Account is inactive")

        data["user"] = user
        return data
    
    
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ['email', 'user_name'] 

