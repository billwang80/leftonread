from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Profile, Book

class BookSerializer(serializers.ModelSerializer):
  # users = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)

  class Meta:
    model = Book
    fields = ('title', 'author', 'country', 'language', 'word_count', 'difficulty', 'cover_image_url', 'popularity', 'publish_date', 'description')

class UserSerializer(serializers.ModelSerializer):
  # books = BookSerializer(many=True, read_only=True)
  phone_number = serializers.CharField(source='profile.phone_number')

  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'first_name', 'last_name', 'phone_number')

class ProfileSerializer(serializers.ModelSerializer):
  user = UserSerializer()
  friends = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.all(), many=True)

  class Meta:
    model = Profile
    fields = ('user', 'friends')

