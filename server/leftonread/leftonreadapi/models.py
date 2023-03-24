from django.db import models
from django.db.models.functions import Coalesce
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User
from django.db.models.signals import post_save, post_delete
from django.core.validators import MaxValueValidator, MinValueValidator
from django.dispatch import receiver

from datetime import datetime 

# https://docs.djangoproject.com/en/dev/topics/auth/customizing/#extending-the-existing-user-model
class Profile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  phone_number = models.CharField(max_length=32, default="", blank=True)
  friends = models.ManyToManyField("self", through='Friendship', symmetrical=True, blank=True)
  profile_picture_url = models.URLField(max_length=500, default="", blank=True)

# https://simpleisbetterthancomplex.com/tutorial/2016/07/22/how-to-extend-django-user-model.html
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
  if created:
    Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
  instance.profile.save()
  
class Friendship(models.Model): # designed for undirected friendship
  user1 = models.ForeignKey(
    'Profile',
    related_name='user2',
    on_delete=models.CASCADE,
  )
  user2 = models.ForeignKey(
    'Profile',
    related_name='user1',
    on_delete=models.CASCADE,
  )
  date_created = models.DateTimeField(default=datetime.now, blank=True)

# https://groups.google.com/g/django-users/c/8xqiSDok2JA?pli=1
@receiver(post_save, sender=Friendship)
def create_friendship(sender, instance, created, **kwargs):
  if created:
    sender.objects.get_or_create(
      user1=instance.user2,
      user2=instance.user1,
      date_created=instance.date_created
    )

@receiver(post_delete, sender=Friendship)
def delete_friendship(sender, instance, **kwargs):
  sender.objects.filter(
    user1=instance.user2,
    user2=instance.user1
  ).delete()

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
  cover_image_url = models.URLField(max_length=500, default="", blank=True)
  # where to buy urls
  amazon_url = models.URLField(max_length=500, default="", blank=True)
  audible_url = models.URLField(max_length=500, default="", blank=True)
  kindle_url = models.URLField(max_length=500, default="", blank=True)
  popularity = models.IntegerField(null=True, blank=True) # need further discussion -> maybe number of users reading 
  publish_date = models.DateField(null=True, blank=True) # this will only be year
  description = models.CharField(max_length=2000, default="", blank=True)
  users = models.ManyToManyField(User, related_name='books', through='UserBookRelation', blank=True)

  def avg_rating(self):
    return Review.objects.filter(book=self).aggregate(
      avg=Coalesce(models.Avg('rating'), 0.0),
    )['avg']

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
    'Book',
    on_delete=models.CASCADE,
  )
  progress = models.CharField(
    max_length=2,
    choices=Progress.choices,
    default=Progress.TOREAD,
  )
  start_date = models.DateField(null=True, blank=True)
  date_completed = models.DateField(null=True, blank=True)

class Review(models.Model):
  user = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
  )
  book = models.ForeignKey(
    'Book',
    on_delete=models.CASCADE,
  )
  review_date = models.DateTimeField(default=datetime.now, blank=True)
  rating = models.IntegerField(
    validators=[
      MaxValueValidator(5),
      MinValueValidator(1)
    ]
  )
  review_text = models.TextField(blank=True)

class Genre(models.Model):
  class GenreOption(models.TextChoices):
    ADVENTURE = 'ADV', _('Adventure')
    MYSTERY = 'MYS', _('Mystery')
    FANTASY = 'FAN', _('Fantasy')
    THRILLER = 'THR', _('Thriller')
    ROMANCE = 'ROM', _('Romance')
    SCIFI = 'SCF', _('Sci-Fi')
    DYSTOPIAN = 'DYS', _('Dystopian')
    CONTEMPORARY = 'CON', _('Contemporary')
    TRAGEDY = 'TRA', _('Contemporary')
    DRAMA = 'DRA', _('Drama')

  genre_name = models.CharField(
    max_length=3, 
    choices=GenreOption.choices,
    null=True,
    blank=True,
  )
  books = models.ManyToManyField(Book, related_name='genres', blank=True)
  users = models.ManyToManyField(Profile, related_name='genres', blank=True)

class Goal(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  goal = models.IntegerField(blank=True)
  goal_date = models.DateTimeField(auto_now=True)

class TimePeriod(models.Model):
  time_period_name = models.CharField(max_length=60, default="")
