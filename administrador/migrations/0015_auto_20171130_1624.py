# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-11-30 21:24
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administrador', '0014_auto_20171129_2234'),
    ]

    operations = [
        migrations.AlterField(
            model_name='respuesta',
            name='fecha',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2017, 11, 30, 16, 24, 41, 245375), null=True),
        ),
    ]
