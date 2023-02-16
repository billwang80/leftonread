from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from django.contrib.auth.models import User
from .models import Book, Profile, Friendship

from .serializers import BookSerializer, UserSerializer, ProfileSerializer

class BookApiView(APIView): # may be useless

  def get(self, request, *args, **kwargs):
    '''
    Get book by ID
    '''
    book = Book.objects.get(id=kwargs.get('book_id')).first()
    serializer = BookSerializer(book)
    return Response(serializer.data, status=status.HTTP_200_OK)

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
