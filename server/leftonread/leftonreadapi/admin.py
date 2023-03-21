from django.contrib import admin

# Register your models here.
from .models import Profile, Friendship, Book, UserBookRelation, Genre, Review

def getFieldsModel(model):
  fields = [field.name for field in model._meta.get_fields() if field.many_to_many != True and field.one_to_many != True]
  return fields

class ProfileAdmin(admin.ModelAdmin):
  list_display = getFieldsModel(Profile)
admin.site.register(Profile, ProfileAdmin)

class FriendshipAdmin(admin.ModelAdmin):
  list_display = getFieldsModel(Friendship)
admin.site.register(Friendship, FriendshipAdmin)

class BookAdmin(admin.ModelAdmin):
  list_display = getFieldsModel(Book)
admin.site.register(Book, BookAdmin)

class GenreAdmin(admin.ModelAdmin):
  list_display = getFieldsModel(Genre)
admin.site.register(Genre, GenreAdmin)

class ReviewAdmin(admin.ModelAdmin):
  list_display = getFieldsModel(Review)
admin.site.register(Review, ReviewAdmin)

class UserBookAdmin(admin.ModelAdmin):
  list_display = getFieldsModel(UserBookRelation)
admin.site.register(UserBookRelation, UserBookAdmin)
