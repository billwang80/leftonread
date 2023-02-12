from django.conf.urls import url
from django.urls import path, include
from .views import (
  BookListApiView,
)

urlpatterns = [
  path('book', BookListApiView.as_view()),
]
