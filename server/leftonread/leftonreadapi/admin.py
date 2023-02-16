from django.contrib import admin

# Register your models here.
from .models import Profile, Friendship, Book, UserBookRelation

admin.site.register(Profile)
admin.site.register(Friendship)
admin.site.register(Book)
admin.site.register(UserBookRelation)
