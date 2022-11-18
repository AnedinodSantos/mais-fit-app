from django.contrib import admin

from nested_admin import NestedModelAdmin, NestedTabularInline

from pedidos.models import Kit, Marmita, MeiosPagamento, Pedido, KitPedido, MarmitaKit


class MarmitaKitInline(NestedTabularInline):
    model = MarmitaKit

    def get_extra(self, request, obj=None, **kwargs):
        return 0 if obj else 10


class KitPedidoInline(NestedTabularInline):
    model = KitPedido
    extra = 0
    inlines =[MarmitaKitInline]


class PedidoAdmin(NestedModelAdmin):
    model = Pedido
    list_display = ("__str__","kit", )
    inlines = [KitPedidoInline]

    def kit(self, obj):
        result = KitPedido.objects.filter(pedido=obj)
        return result[0]


admin.site.register(Kit)
admin.site.register(Marmita)
admin.site.register(MeiosPagamento)
admin.site.register(Pedido, PedidoAdmin)
