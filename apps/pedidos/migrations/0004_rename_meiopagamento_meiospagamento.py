# Generated by Django 4.1.1 on 2022-10-27 23:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pedidos', '0003_meiopagamento_alter_marmita_ativo'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='MeioPagamento',
            new_name='MeiosPagamento',
        ),
    ]
