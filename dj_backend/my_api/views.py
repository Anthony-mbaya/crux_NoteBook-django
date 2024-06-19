# This function is typically used to render a template with a given context.
from django.shortcuts import render

# Importing the User model from Django's built-in authentication system.
from django.contrib.auth.models import User

# The generics module provides a set of generic views that help you quickly implement common patterns.
from rest_framework import generics


from .serializers import UserSerializer, NoteSerializer

# Importing permission classes from the Django REST framework.
# These classes control the access to views based on the permissions set.
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Note

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all() #check all objects as we create new
    serializer_class = UserSerializer #defines the data [username,pass]
    permission_classes = [AllowAny] #any person can create

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors) 


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
