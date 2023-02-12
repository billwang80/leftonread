from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Book

class BookSerializer(serializers.ModelSerializer):
  user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)

  class Meta:
    model = Book
    fields = ('title', 'author', 'country', 'language', 'word_count', 'difficulty', 'cover_image_url', 'popularity', 'date_written', 'description', 'user')

class UserSerializer(serializers.ModelSerializer):
  book = BookSerializer(many=True, read_only=True)

  class Meta:
    model = User
    fields = ('username', 'email', 'id', 'book')
