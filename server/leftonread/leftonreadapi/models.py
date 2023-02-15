from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User

from datetime import date

# Create your models here.
class Book(models.Model):

  class Difficulty(models.TextChoices):
    EASY = 'E', _('Easy')
    MEDIUM = 'M', _('Medium')
    HARD = 'H', _('Hard')

  title = models.CharField(max_length=100, default="", blank=True)
  author = models.CharField(max_length=60, default="", blank=True)
  country = models.CharField(max_length=60, default="", blank=True)
  language = models.CharField(max_length=2, default="", blank=True)
  word_count = models.IntegerField(null=True, blank=True)
  difficulty = models.CharField(
    max_length=1, 
    choices=Difficulty.choices,
    default=Difficulty.EASY,
  )
  cover_image_url = models.URLField(max_length=200, default="", blank=True)
  popularity = models.IntegerField(null=True, blank=True) # need further discussion -> maybe number of users reading 
  publish_date = models.DateField(null=True, blank=True) # this will only be year
  description = models.CharField(max_length=2000, default="", blank=True)
  users = models.ManyToManyField(User, related_name='books', through='UserBookRelation', blank=True)

class UserBookRelation(models.Model):
  
  class Progress(models.TextChoices):
    READING = 'RE', _('Reading')
    TOREAD = 'TR', _('To Read')
    COMPLETE = 'CO', _('Completed')

  user = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
  )
  book = models.ForeignKey(
    "Book",
    on_delete=models.CASCADE,
  )
  progress = models.CharField(
    max_length=2,
    choices=Progress.choices,
    default=Progress.TOREAD,
  )
  start_date = models.DateField(null=True, blank=True)
  date_completed = models.DateField(null=True, blank=True)

# possibly combine genre and time period into tags? -> # class BookTag() # relationship table for books and tags
class Genre(models.Model):
  genre_name = models.CharField(max_length=60, default="")

class TimePeriod(models.Model):
  time_period_name = models.CharField(max_length=60, default="")

