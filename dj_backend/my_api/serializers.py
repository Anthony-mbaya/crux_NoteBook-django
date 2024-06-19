# Importing the User model from Django's built-in authentication system.
from django.contrib.auth.models import User
# Importing the serializers module from the Django REST framework.
# Serializers in Django REST framework are used to convert model instances to JSON format that can be saved
# to the database. This makes it easier to create API endpoints that interact with models.
from rest_framework import serializers

from .models import Note


class UserSerializer(serializers.ModelSerializer):
    class Meta: #specify which model to use and which fields to include in the serialization.
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = { 'password' : { 'write_only':True } } #accept the passsowrd but no one can read the pass
    # is a dictionary of validated data passed from the serializer
    #  contains all the necessary fields passed at Meta
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id','title','content','created_at','author']
        extra_kwargs = { 'author': {'read_only':True } }