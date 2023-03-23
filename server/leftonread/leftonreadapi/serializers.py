from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator

from .models import Profile, Book, Genre, Review, Goal

class GoalSerializer(serializers.ModelSerializer):
  class Meta:
    model = Goal
    fields = ('user', 'goal', 'goal_date')

class GenreSerializer(serializers.ModelSerializer):
  class Meta:
    model = Genre
    fields = ('genre_name', 'books', 'users')

class BookSerializer(serializers.ModelSerializer):
  # users = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)
  genres = GenreSerializer(many=True, read_only=True)
  # genres = serializers.CharField(source='genre.genre_name')

  class Meta:
    model = Book
    fields = (
      'title', 'author', 'country', 'language', 'word_count', 'difficulty', 
      'cover_image_url', 'avg_rating', 'publish_date', 'amazon_url', 'audible_url', 
      'kindle_url', 'description', 'genres'
    )

class UserSerializer(serializers.ModelSerializer):
  # books = BookSerializer(many=True, read_only=True)
  phone_number = serializers.CharField(source='profile.phone_number')

  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'first_name', 'last_name', 'phone_number')

class ReviewSerializer(serializers.ModelSerializer):
  # user = UserSerializer()
  # book = BookSerializer()

  class Meta:
    model = Review
    fields = ('rating', 'review_date', 'review_text', 'user', 'book')

class ProfileSerializer(serializers.ModelSerializer):
  user = UserSerializer()
  friends = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.all(), many=True)

  class Meta:
    model = Profile
    fields = ('user', 'profile_picture_url', 'friends')

class RegisterSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(
    required=True,
    validators=[UniqueValidator(queryset=User.objects.all())]
  )

  password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
  password2 = serializers.CharField(write_only=True, required=True)

  class Meta:
    model = User
    fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')
    # extra_kwargs = {
    #   'first_name': {'required': True},
    #   'last_name': {'required': True}
    # }

  def validate(self, attrs):
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError({'password': "Password fields didn't match."})
    return attrs

  def create(self, validated_data):
    user = User.objects.create(
      username=validated_data['username'],
      email=validated_data['email'],
      first_name=validated_data['first_name'],
      last_name=validated_data['last_name']
    )

    user.set_password(validated_data['password'])
    user.save()

    return user

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super(MyTokenObtainPairSerializer, cls).get_token(user)

    token['username'] = user.username
    return token