from django.conf.urls import url
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
  BookListByUserApiView,
  UserListByBookApiView,
  BookByUserGenre,
  BookReview,
  AuthorReviews,
  FriendReviews,
  PostReview,
  ListFriends,
  ProfileView,
  MyObtainTokenPairView,
  RegisterView,
)

urlpatterns = [
  # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
  # auth
  # https://stackoverflow.com/questions/30739352/django-rest-framework-token-authentication-logout
  path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
  path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('register/', RegisterView.as_view(), name='auth_register'),

  # app
  path('profile/<int:user_id>/', ProfileView.as_view()),
  path('books-by-user/', BookListByUserApiView.as_view()),
  path('books-by-user/<int:user_id>/', BookListByUserApiView.as_view()),
  path('users-by-book/<int:book_id>/', UserListByBookApiView.as_view()),
  path('reviews/<int:book_id>/', BookReview.as_view()),
  path('user-reviews/<int:user_id>/', AuthorReviews.as_view()),
  path('friend-reviews/<int:user_id>/', FriendReviews.as_view()),
  path('reviews/', PostReview.as_view()),
  path('genre-recommend/<int:user_id>/', BookByUserGenre.as_view()),
  path('friends/<int:user_id>/', ListFriends.as_view()),
]
