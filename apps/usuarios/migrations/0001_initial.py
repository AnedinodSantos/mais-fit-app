# Generated by Django 4.1.1 on 2022-10-15 20:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome_completo', models.CharField(max_length=50)),
                ('cpf', models.CharField(blank=True, max_length=11, unique=True)),
                ('nascimento', models.DateField(blank=True)),
                ('celular', models.CharField(max_length=11)),
                ('genero', models.CharField(choices=[('F', 'Feminino'), ('M', 'Masculino'), ('N', 'Não binário')], max_length=1)),
            ],
            options={
                'db_table': 'clientes',
            },
        ),
        migrations.CreateModel(
            name='EderecoEntrega',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cep', models.CharField(max_length=8)),
                ('logradouro', models.CharField(max_length=100)),
                ('numero', models.CharField(max_length=5)),
                ('bairro', models.CharField(max_length=30)),
                ('complemento', models.CharField(blank=True, max_length=25)),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usuarios.cliente')),
            ],
            options={
                'db_table': 'enderecos_entrega',
            },
        ),
    ]