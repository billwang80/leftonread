# Generated by Django 3.2.16 on 2023-03-23 19:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leftonreadapi', '0019_alter_genre_genre_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='profile_picture_url',
            field=models.URLField(blank=True, default='', max_length=500),
        ),
    ]