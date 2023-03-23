from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from django.contrib.auth.models import User
from .models import Book, Profile, Friendship, Genre, Review

from .serializers import (
  MyTokenObtainPairSerializer, 
  BookSerializer, 
  UserSerializer, 
  ProfileSerializer, 
  RegisterSerializer,
  ReviewSerializer
)
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView

'''
Need:
- Get friends by userId /
- Get users reading book /
- Get all books x
- Get books on user's list /
- Get recommended books for users (genre) /
- Get reviews of a book /
- Get users profile x
- Get reviews from author /
- Get all reviews from friends /
- Write review x
- Reading goal -> number of books in year x
'''

class FriendReviews(APIView):
  def get(self, request, *args, **kwargs):
    '''
    Get reviews written by friends of userId
    '''
    user_id = kwargs.get('user_id')
    friends = User.objects.filter(profile__in=Profile.objects.filter(friends=user_id))
    reviews = Review.objects.filter(user__in=friends)
    review_serializer = ReviewSerializer(reviews, many=True)
    return Response(review_serializer.data, status=status.HTTP_200_OK)

class AuthorReviews(APIView):
  def get(self, request, *args, **kwargs):
    '''
    Get the reviews written by userId
    '''
    user_id = kwargs.get('user_id')
    reviews = Review.objects.filter(user=user_id)
    review_serializer = ReviewSerializer(reviews, many=True)
    return Response(review_serializer.data, status=status.HTTP_200_OK)

class BookReview(APIView):
  def get(self, request, *args, **kwargs):
    '''
    Get the reviews of a book by book_id
    '''
    book_id = kwargs.get('book_id')
    reviews = Review.objects.filter(book=book_id)
    review_serializer = ReviewSerializer(reviews, many=True)
    return Response(review_serializer.data, status=status.HTTP_200_OK)

class ProfileView(APIView):
  def get(self, request, *args, **kwargs):
    '''
    Get profile by user_id
    '''
    user_id = kwargs.get('user_id')
    profile = Profile.objects.get(user=user_id)
    serializer = ProfileSerializer(profile)
    return Response(serializer.data, status=status.HTTP_200_OK)

# may be useless
class BookApiView(APIView): 
  def get(self, request, *args, **kwargs):
    '''
    Get book by ID
    '''
    book = Book.objects.get(id=kwargs.get('book_id')).first()
    serializer = BookSerializer(book)
    return Response(serializer.data, status=status.HTTP_200_OK)

class ListBooks(APIView):
  def get(self, request):
    '''
    Get all books
    '''
    books = Book.objects.filter()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

class BookByUserGenre(APIView):
  def get(self, request, *args, **kwargs):
    '''
    Get recommended books by genre of userId
    '''
    user_id = kwargs.get('user_id', request.user.id)
    genres = Genre.objects.filter(users=user_id)
    books = Book.objects.filter(genres__in=genres)

    book_serializer = BookSerializer(books, many=True)
    return Response(book_serializer.data, status=status.HTTP_200_OK)

class BookListByUserApiView(APIView):
  # add permission to check if user is auth
  permission_classes = [permissions.IsAuthenticated]

  def get(self, request, *args, **kwargs):
    '''
    List all books that the requested user reads, if no requested user, get current auth user
    '''
    user_id = kwargs.get('user_id', request.user.id)
    books = Book.objects.filter(users=user_id)
    user = User.objects.get(id=user_id)

    book_serializer = BookSerializer(books, many=True)
    user_serializer = UserSerializer(user)

    data = { 'user': user_serializer.data, 'books': book_serializer.data }

    return Response(data, status=status.HTTP_200_OK)

class UserListByBookApiView(APIView):
  def get(self, request, *args, **kwargs):
    '''
    List all users from the requested book
    '''
    book_id = kwargs.get('book_id')
    users = User.objects.filter(books=book_id)
    book = Book.objects.get(id=book_id)

    user_serializer = UserSerializer(users, many=True)
    book_serializer = BookSerializer(book)

    data =  { 'book': book_serializer.data, 'users': user_serializer.data }

    return Response(data, status=status.HTTP_200_OK)

# https://stackoverflow.com/questions/6567831/how-to-perform-or-condition-in-django-queryset
class ListFriends(APIView):
  def get(self, request, *args, **kwargs):
    '''
    List friends of user by user Id
    '''
    user_id = kwargs.get('user_id')
    users = Profile.objects.filter(friends=user_id)
    serializer = ProfileSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

class RegisterView(generics.CreateAPIView):
  queryset = User.objects.all()
  permission_classes = (permissions.AllowAny,)
  serializer_class = RegisterSerializer

class MyObtainTokenPairView(TokenObtainPairView):
  permission_classes = (permissions.AllowAny,)
  serializer_class = MyTokenObtainPairSerializer
