from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import ProfileSerializer, ContactSerializer, RegisterSerializer
from .models import Profile

@api_view(['POST'])
def contact(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'status': 'success'})
    return Response(serializer.errors, status=400)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = Profile.objects.get(user=request.user)
        data = {
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email
        }

        # serializer = ProfileSerializer(profile)
        # return Response(serializer.data)
        return Response(data)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer