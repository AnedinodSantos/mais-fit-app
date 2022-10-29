from random import choices
from django.db import models
from django.contrib.auth.models import User

class Cliente(models.Model):
    GENERO = (
        ("F", "Feminino"),
        ("M", "Masculino"),
        ("N", "Não binário"),
    )
    #usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    nome_completo = models.CharField(max_length=50, null=False, blank=False)
    cpf = models.CharField(max_length=11, null=False, blank=True, unique=True)
    nascimento = models.DateField(null=False, blank=True)
    celular = models.CharField(max_length=11, null=False, blank=False)
    genero = models.CharField(max_length=1, choices=GENERO, null=False)


    def __str__(self) -> str:
        return self.nome_completo


    class Meta:
        db_table = "clientes"


class EnderecosEntrega(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    cep = models.CharField(max_length=8, null=False, blank=False)
    logradouro = models.CharField(max_length=100, null=False, blank=False)
    numero = models.CharField(max_length=5, null=False, blank=False)
    bairro = models.CharField(max_length=30, null=False, blank=False)
    complemento = models.CharField(max_length=25, null=False, blank=True)
    cidade = models.CharField(max_length=50, null=False, blank=False)

    def __str__(self) -> str:
        endereco = f"{self.logradouro}, {self.numero}, {self.bairro} - {self.cidade}"
        return endereco

    class Meta:
        db_table = "enderecos_entrega"
