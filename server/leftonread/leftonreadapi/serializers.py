from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Book

class BookSerializer(serializers.ModelSerializer):
  users = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)

  class Meta:
    model = Book
    fields = ('title', 'author', 'country', 'language', 'word_count', 'difficulty', 'cover_image_url', 'popularity', 'publish_date', 'description', 'users')

class UserSerializer(serializers.ModelSerializer):
  # books = BookSerializer(many=True, read_only=True)

  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'first_name', 'last_name')
