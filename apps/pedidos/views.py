from django.shortcuts import render

from pedidos.models import Kit, Marmita, MeiosPagamento



def index(request):
    kits = Kit.objects.filter(ativo=True)
    marmitas = Marmita.objects.filter(ativo=True)
    meios_pagamento = MeiosPagamento.objects.filter(ativo=True)
    contexto = {
        'kits': kits,
        'marmitas': marmitas,
        'meios_pagamento': meios_pagamento,
    }
    return render(request, "index.html", contexto)


def monte_seu_kit(request, kitId):
    kit = Kit.objects.get(id=kitId)
    marmitas = Marmita.objects.filter(ativo=True)
    contexto = {
        'kit': kit,
        'marmitas': marmitas,
    }
    return render(request, 'monte-seu-kit.html', contexto)


def carrinho(request):
    return render(request, 'carrinho.html')