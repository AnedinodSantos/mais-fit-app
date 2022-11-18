from django.db import models
from django.utils import timezone

from usuarios.models import Cliente, EnderecosEntrega

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
    # esse campo deve ser mudado para um imageFild
    link_img = models.CharField(max_length=500, blank=True)
    qtd_marmitas = models.IntegerField(null=False)
    valor = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    ativo = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.titulo

    class Meta:
        db_table = 'kits'


class MeiosPagamento(models.Model):
    titulo = models.CharField(max_length=50, null=False)
    # esse campo deve ser mudado para um imageFild
    link_img = models.CharField(max_length=500, blank=True)
    ativo = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.titulo

    class Meta:
        db_table = "meios_pagamento"


class Pedido(models.Model):
    ESCOLHAS = (
        ("R", "Realizado"),
        ("V", "Validado"),
        ("S", "Separado"),
        ("D", "Despachado"),
        ("E", "Entregue"),
        ("C", "Cancelado"),
    )
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    endereco = models.ForeignKey(EnderecosEntrega, on_delete=models.CASCADE)
    meio_pagamento = models.ForeignKey(MeiosPagamento, on_delete=models.CASCADE)
    status = models.CharField(max_length=1,choices=ESCOLHAS, null=False, blank=False)
    data_emissao = models.DateTimeField(default=timezone.now, blank=True)

    def __str__(self) -> str:
        return f"Pedido número {self.id}"

    def __kit(self):
        result = KitPedido.objects.filter(pedido=self)
        return result[0]

    kit = property(__kit)


    class Meta:
        db_table = "pedidos"


class KitPedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    kit = models.ForeignKey(Kit, on_delete=models.CASCADE)
    preco = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    def __str__(self) -> str:
        return self.kit.titulo

    class Meta:
        db_table = "kits_pedidos"


class MarmitaKit(models.Model):
    kit_pedido = models.ForeignKey(KitPedido, on_delete=models.CASCADE)
    marmita = models.ForeignKey(Marmita, on_delete=models.CASCADE)
    qtd_marmita = models.IntegerField(null=False, blank=False)

    def __str__(self) -> str:
        return self.marmita.titulo

    class Meta:
        db_table = "marmitas_kit"
        constraints = [
            models.UniqueConstraint(
                fields=['kit_pedido', 'marmita'], name='unique_primaryKey'
            )
        ]
