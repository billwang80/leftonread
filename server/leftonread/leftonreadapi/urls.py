from django.conf.urls import url
from django.urls import path, include
from .views import (
  BookListByUserApiView,
  UserListByBookApiView,
)

urlpatterns = [
  # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
  path('book/', BookListByUserApiView.as_view()),
  path('book/<int:user_id>/', BookListByUserApiView.as_view()),
  path('user/<int:book_id>/', UserListByBookApiView.as_view()),
]
