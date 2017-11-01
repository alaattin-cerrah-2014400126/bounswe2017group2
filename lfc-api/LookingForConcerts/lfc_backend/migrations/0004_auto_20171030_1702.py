# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-30 17:02
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lfc_backend', '0003_auto_20171030_1611'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='registereduser',
            options={'verbose_name': 'registered_user', 'verbose_name_plural': 'registered_users'},
        ),
        migrations.AlterField(
            model_name='registereduser',
            name='email',
            field=models.EmailField(db_index=True, max_length=255, unique=True, verbose_name='email address'),
        ),
    ]