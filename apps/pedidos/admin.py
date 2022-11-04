from django.contrib import admin

from pedidos.models import Kit, Marmita, MeiosPagamento, Pedido, KitPedido, MarmitaKit


# class KitPedidoInline(admin.StackedInline):
#     model = KitPedido
#     extra = 0


# class PedidoAdmin(admin.ModelAdmin):
#     readonly_fields = ("cliente", "data_emissao")
#     inlines = [KitPedidoInline]


# class MarmitaKitInline(admin.StackedInline):
#     model = MarmitaKit


# class MarmitaKitAdmin(admin.ModelAdmin):
#     inlines = [MarmitaKitInline]



admin.site.register(Kit)
admin.site.register(Marmita)
admin.site.register(MeiosPagamento)
admin.site.register(Pedido,)
# admin.site.register(KitPedido, MarmitaKitAdmin)