# Generated by Django 4.2.11 on 2024-07-09 11:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learn', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='moves',
            name='forbidden',
            field=models.BooleanField(default=False),
        ),
    ]
