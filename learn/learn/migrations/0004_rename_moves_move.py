# Generated by Django 4.2.11 on 2024-07-09 12:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('learn', '0003_belt_alter_moves_belt'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Moves',
            new_name='Move',
        ),
    ]
