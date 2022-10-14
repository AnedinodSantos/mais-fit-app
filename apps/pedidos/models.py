from django.db import models

class Marmita(models.Model):
    titulo = models.CharField(max_length=100, null=False)
    descricao = models.TextField(max_length=500, blank=True)
    link_img = models.CharField(max_length=500, blank=True)
    ativo = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.titulo

    class Meta:
        db_table = 'marmitas'


class Kit(models.Model):
    titulo = models.CharField(max_length=100, null=False)
    descricao = models.TextField(max_length=500, blank=True)
    # esse campo deve ser mudado para um FileField
    link_img = models.CharField(max_length=500, blank=True)
    qtd_marmitas = models.IntegerField(null=False)
    valor = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    ativo = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.titulo

    class Meta:
        db_table = 'kits'
