# Generated by Django 4.1.1 on 2022-10-14 20:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedidos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='marmita',
            name='ativo',
            field=models.BooleanField(),
        ),
    ]
