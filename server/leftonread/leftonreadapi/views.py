from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from .models import Book
from .serializers import BookSerializer

class BookListApiView(APIView):
  # add permission to check if user is auth
  permission_classes = [permissions.IsAuthenticated]

  def get(self, request, *args, **kwargs):
    '''
    List all books that the current user reads
    '''
    books = Book.objects.filter(users=request.user.id)
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
