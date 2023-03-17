from django.conf.urls import url
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
  BookListByUserApiView,
  UserListByBookApiView,
  ListFriends,
  MyObtainTokenPairView,
  RegisterView,
)

urlpatterns = [
  # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
  # auth
  path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
  path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('register/', RegisterView.as_view(), name='auth_register'),

  # app
  path('books-by-user/', BookListByUserApiView.as_view()),
  path('books-by-user/<int:user_id>/', BookListByUserApiView.as_view()),
  path('users-by-book/<int:book_id>/', UserListByBookApiView.as_view()),
  path('friends/<int:user_id>/', ListFriends.as_view()),
]
