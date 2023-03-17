from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator

from .models import Profile, Book

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
