# Generated by Django 3.2.16 on 2023-03-20 21:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('leftonreadapi', '0015_auto_20230320_1653'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='users_reviewed',
        ),
    ]
