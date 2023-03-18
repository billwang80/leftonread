# Generated by Django 3.2.16 on 2023-03-17 19:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leftonreadapi', '0012_alter_friendship_user2'),
    ]

    operations = [
        migrations.AddField(
            model_name='genre',
            name='books',
            field=models.ManyToManyField(blank=True, related_name='genres', to='leftonreadapi.Book'),
        ),
        migrations.AddField(
            model_name='genre',
            name='users',
            field=models.ManyToManyField(blank=True, related_name='genres', to='leftonreadapi.Profile'),
        ),
    ]