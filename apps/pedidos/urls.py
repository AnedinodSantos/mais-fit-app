from django.urls import path

from pedidos.views import *

urlpatterns = [
    path('', index, name='index'),
    path('monte-seu-kit/<int:kitId>', monte_seu_kit, name='monte_seu_kit'),
    path('carrinho', carrinho, name='carrinho')
]