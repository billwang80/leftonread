from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from django.contrib.auth.models import User
from .models import Book

from .serializers import BookSerializer, UserSerializer

class BookListByUserApiView(APIView):
  # add permission to check if user is auth
  permission_classes = [permissions.IsAuthenticated]

  def get(self, request, *args, **kwargs):
    '''
    List all books that the requested user reads, if no requested user, get current auth user
    '''
    books = None
    user_id = kwargs.get('user_id', None)
    if user_id:
      books = Book.objects.filter(users=user_id)
    else:
      books = Book.objects.filter(users=request.user.id)
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

class UserListByBookApiView(APIView):

  def get(self, request, *args, **kwargs):
    '''
    List all users from the requested book
    '''
    book_id = kwargs.get('book_id', None)
    users = User.objects.filter(books=book_id)
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
