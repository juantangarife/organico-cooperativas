# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-12-01 16:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productor', '0015_oferta_cantidad'),
    ]

    operations = [
        migrations.AddField(
            model_name='oferta',
            name='cantidadEsta',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='oferta',
            name='estado',
            field=models.TextField(blank=True, default=b'1', null=True),
        ),
        migrations.AddField(
            model_name='oferta',
            name='fechaAprRecha',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='oferta',
            name='motivoRechazo',
            field=models.CharField(blank=True, max_length=550, null=True),
        ),
        migrations.AddField(
            model_name='oferta',
            name='precioEsta',
            field=models.TextField(blank=True, null=True),
        ),
    ]
