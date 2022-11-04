from django.urls import path

from pedidos.views import *

urlpatterns = [
    path('', index, name='index'),
    path('recebe-pedido', recebe_pedido, name='recebePedido'),
    path('sucesso/<int:id_pedido>', sucesso, name='sucesso')
]