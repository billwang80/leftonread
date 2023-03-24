# Generated by Django 3.2.16 on 2023-03-23 16:27

from django.db import migrations

def add_empty_genres(app, schema_editor):
    genre_model = app.get_model('leftonreadapi', 'Genre')
    genres = [
        'ADV',
        'MYS',
        'FAN',
        'THR',
        'ROM',
        'SCF',
        'DYS',
        'CON'
    ]

    for genre in genres:
        genre_model.objects.create(genre_name=genre)


class Migration(migrations.Migration):

    dependencies = [
        ('leftonreadapi', '0018_auto_20230322_1241'),
    ]

    operations = [
        migrations.RunPython(add_empty_genres),
    ]