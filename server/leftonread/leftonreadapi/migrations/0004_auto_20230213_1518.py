# Generated by Django 3.2.16 on 2023-02-13 20:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('leftonreadapi', '0003_alter_book_users'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userbookrelation',
            old_name='book_id',
            new_name='book',
        ),
        migrations.RenameField(
            model_name='userbookrelation',
            old_name='user_id',
            new_name='user',
        ),
    ]
