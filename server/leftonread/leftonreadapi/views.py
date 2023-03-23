from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from django.contrib.auth.models import User
from .models import Book, Profile, Friendship, Genre, Review, Goal

from .serializers import (
  MyTokenObtainPairSerializer, 
  BookSerializer, 
  GenreSerializer,
  GoalSerializer,
  UserSerializer, 
  ProfileSerializer, 
  RegisterSerializer,
  ReviewSerializer
)
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView

from datetime import date, datetime

'''
Need:
- Register account /
- Refresh token /
- Get friends by userId /
- Get users reading book /
- Get all books /
- Get books on user's list /
- Get recommended books for users (genre) /
- Get reviews of a book /
- Get users profile /
- Get books of friends /
- Get reviews from author /
- Get all reviews from friends /
- Write review /
- Select favourite genres /
- Create reading progression /
- Get reading goal -> number of books in year /
- Create reading goal x
'''

class CreateGoal(APIView):
  permission_classes = [permissions.IsAuthenticated]

  def put(self, request):
    '''
    Create/update reading goal for user
    '''
    user_id = request.user.id
    data = request.data

    queryset = Goal.objects.filter(user=user_id)
    if queryset.exists():
      goal = queryset.first()
      goal.goal = data['goal']
      # goal.goal_date = datetime.now()
      goal.save()
      return Response(status=status.HTTP_201_CREATED)
    else:
      goal_data = {
        'user': user_id,
        'goal': data['goal']
      }
      serializer = GoalSerializer(data=goal_data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReadingGoal(APIView):
  def get(self, request, *args, **kwargs):
    '''
    Get reading goal by user_id
    '''
    user_id = kwargs.get('user_id')
    goal = Goal.objects.get(user=user_id)

    first_day = date(date.today().year, 1, 1)
    last_day = date(date.today().year, 12, 31)
    books_read = Book.objects.filter(
      users=user_id, 
      userbookrelation__date_completed__range=(first_day, last_day)
    )

    book_serializer = BookSerializer(books_read, many=True)
    goal_serializer = GoalSerializer(goal)

    data = { 'goal': goal_serializer.data, 'books': book_serializer.data }
    return Response(data, status=status.HTTP_200_OK)

class SelectGenres(APIView):
  permission_classes = [permissions.IsAuthenticated]

  def put(self, request):
    '''
    Select favourite genres for user
    Removes all non-selected genres
    '''
    user_id = request.user.id
    data = request.data
    genre_set = set()

    for item in data:
      genre_set.add(item['genre_name'])

    genres = Genre.objects.all()

    for genre in genres:
      if genre.genre_name not in genre_set:
        genre.users.remove(user_id)
      else:
        genre.users.add(user_id)

    return Response(status=status.HTTP_201_CREATED)

class PostReview(APIView):
  permission_classes = [permissions.IsAuthenticated]

  def post(self, request):
    '''
    Post review if user and book review does not exist
    '''
    user_id = request.user.id
    book_id = request.data.get('book')

    if Review.objects.filter(user=user_id, book=book_id).exists():
      return Response("You already made a review for this book", status.HTTP_400_BAD_REQUEST)

    data = {
      'rating': request.data.get('rating'),
      'review_text': request.data.get('review_text'),
      'user': user_id,
      'book': book_id
    }
    serializer = ReviewSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

class FriendBooks(APIView):
  def get(self, request, *args, **kwargs):
    '''
    Get books of friends of userId
    '''
    user_id = kwargs.get('user_id')
    friends = User.objects.filter(profile__in=Profile.objects.filter(friends=user_id))
    books = Book.objects.filter(users__in=friends)
    book_serializer = BookSerializer(books, many=True)
    return Response(book_serializer.data, status=status.HTTP_200_OK)

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
