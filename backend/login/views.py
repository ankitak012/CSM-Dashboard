from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import LoginSerializer

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            return Response({
                "message": "Login successful",
                "email": user.email,
                "user_name": user.user_name
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserView(APIView):
    def get(self, request):
        return Response({"message": "User details fetched successfully"})   

