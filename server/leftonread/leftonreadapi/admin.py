from django.contrib import admin

# Register your models here.
from .models import Book, UserBookRelation

admin.site.register(Book)
admin.site.register(UserBookRelation)
