from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Server
from .serializers import ServerSerializer
from logger import logger
from django.core.exceptions import ValidationError


class ServerView(APIView):
    def get(self, request):
        servers = Server.objects.all()
        serializer = ServerSerializer(servers, many=True)
        return Response(serializer.data)

    def post(self, request):
        logger.debug(f"Received data from frontend:{request.data}") 
        # Debug print
        
        data = request.data.copy()
        # Extract the email string and convert it into list
        email_string = data.get('emails', '')
        logger.debug(f"email_string: {email_string}")
        
        email_list = [email.strip() for email in email_string.split(';') if email.strip()]
        logger.debug(f"Parsed email list: {email_list}" )
        
        data['emails']= email_list
        logger.debug(f"Updated data['emails']: {data['emails']}" )
        
        serializer = ServerSerializer(data=data)
        try: 
            if serializer.is_valid():
                instance = serializer.save()
                logger.debug(f"Saved instance:{ instance}")
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:   
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except ValidationError as e: 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def put(self, request, pk):
        server = get_object_or_404(Server, pk=pk)
        serializer = ServerSerializer(server, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        server = get_object_or_404(Server, pk=pk)
        server.delete()
        return Response({"message": "Server deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
