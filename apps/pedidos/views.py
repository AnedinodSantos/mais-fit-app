import json

from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist

from pedidos.models import Kit, Marmita, MeiosPagamento, KitPedido, MarmitaKit, Pedido
from usuarios.models import Cliente, EnderecosEntrega




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


def recebe_pedido(request):
    if request.method == "POST":
        id_pedido = None
        post_data = json.loads(request.body.decode("utf-8"))

        dados_cliente = post_data["dadosCliente"]
        dados_endereco = post_data["endereco"]
        pagamento = post_data["pagamento"]
        kit = post_data["produto"]["kit"]
        marmitas = post_data["produto"]["marmitas"]

        validado = valida_dados_pedido(dados_cliente, dados_endereco,
                                       pagamento, kit, marmitas)

        if validado:
            id_cliente = grava_cliente(dados_cliente)
            id_endereco = grava_endereco_cliente(dados_endereco, id_cliente)
            id_pedido = grava_pedido_cliente(id_cliente, id_endereco,
                                             pagamento, kit, marmitas)

        if id_pedido is not None:
            return HttpResponse(id_pedido)

    return redirect("index")


# criar url
def sucesso(request, id_pedido):
    contexto = {"id":id_pedido}
    return render(request, "sucesso.html", contexto)



# funções auxiliares
def grava_cliente(cliente: dict):
    # faz insert/update dos dados do cliente
    nome = cliente["nome"]
    cpf = cliente["cpf"]
    nascimento = cliente["dataNascimento"]
    email = cliente["email"]
    telefone = cliente["telefone"]


    try:
        cli = Cliente.objects.get(cpf=cliente["cpf"])
        cli.nome = nome
        cli.cpf = cpf
        cli.nascimento = nascimento
        cli.celular = telefone
    except ObjectDoesNotExist:
        cli = Cliente.objects.create(nome_completo=nome, cpf=cpf, nascimento=nascimento, celular=telefone)

    cli.save()
    print(cli.id)
    return cli.id


def grava_endereco_cliente(endereco: dict, id_cliente):
    # faz insert/update dos dados do endereço do cliente
    cep = endereco["cep"]
    logradouro = endereco["logradouro"]
    numero = endereco["numero"]
    bairro = endereco["bairro"]
    complemento = endereco["complemento"]
    cidade = endereco["cidade"]
    cli = Cliente.objects.get(id=id_cliente)
    try:
        ender = EnderecosEntrega.objects.select_related().get(cliente=id_cliente)
        ender.cep = cep
        ender.logradouro = logradouro
        ender.numero = numero
        ender.bairro = bairro
        ender.complemento = complemento
        ender.cidade = cidade
    except ObjectDoesNotExist:
        ender = EnderecosEntrega.objects.create(cliente=cli, cep=cep, 
                                                logradouro=logradouro, 
                                                numero=numero, bairro=bairro, 
                                                complemento=complemento, 
                                                cidade=cidade)
    ender.save()
    print(ender.id)
    return ender.id


def grava_pedido_cliente(id_cliente, id_endereco, pagamento: str, kit: dict, marmitas: list):

    cliente = Cliente.objects.get(id=id_cliente)
    endereco = EnderecosEntrega.objects.get(id=id_endereco)
    meio_pagamento = MeiosPagamento.objects.get(titulo=pagamento)
    kit_cli = Kit.objects.get(id=int(kit["id"]))

    kit_preco = float(kit["valor"].replace(",", "."))
    status = "R"

    pedido = Pedido.objects.create(cliente=cliente, endereco=endereco, meio_pagamento=meio_pagamento, status=status)
    pedido.save()

    kit_pedido = KitPedido.objects.create(pedido=pedido, kit=kit_cli, preco=kit_preco)
    kit_pedido.save()

    for m in marmitas:
        marmita = Marmita.objects.get(id=int(m["id"]))
        marmita_kit = MarmitaKit.objects.create(kit_pedido=kit_pedido, marmita=marmita, qtd_marmita=int(m["qtd"]))
        marmita_kit.save()
    return pedido.id



def valida_dados_pedido(cliente: dict, endereco: dict, pag: str, kit: dict, marmitas: list):
    cliente_valido = valida_dados_cliente(cliente)
    endereco_valido = valida_dados_endereco(endereco)
    kit_valido = valida_dados_kit(kit)
    marmitas_validas = valida_dados_marmitas(marmitas)
    meios_pagamento = MeiosPagamento.objects.filter(ativo=True)
    pagamento_valido = False
    for mp in meios_pagamento:
        if pag == mp.titulo:
            pagamento_valido = True
    if cliente_valido and endereco_valido and kit_valido and marmitas_validas and pagamento_valido:
        return True
    return False



def valida_dados_cliente(cliente: dict):
    # validar se tem todos os dados preenchidos
    nome_vazio = campo_vazio(cliente["nome"])
    cpf_vazio = campo_vazio(cliente["cpf"])
    nasc_vazio = campo_vazio(cliente["dataNascimento"])
    email_vazio = campo_vazio(cliente["email"])
    telefone_vazio = campo_vazio(cliente["telefone"])
    if nome_vazio and cpf_vazio and nasc_vazio and email_vazio and telefone_vazio:
        return False
    return True



def valida_dados_endereco(endereco: dict):
    # validar se tem todos os dados preenchidos
    cep_vazio = campo_vazio(endereco["cep"])
    logradouro_vazio = campo_vazio(endereco["logradouro"])
    numero_vazio = campo_vazio(endereco["numero"])
    bairro_vazio = campo_vazio(endereco["bairro"])
    cidade_vazio = campo_vazio(endereco["cidade"])

    if cep_vazio and logradouro_vazio and numero_vazio and bairro_vazio and cidade_vazio:
        return False
    return True


def valida_dados_kit(kit: dict):
    # validar se tem todos os dados preenchidos
    kit_vazio = campo_vazio(kit["id"])
    if kit_vazio:
        return False
    return True


def valida_dados_marmitas(marmitas: list):
    # validar se tem todos os dados preenchidos

    if len(marmitas) > 0:
        for marmita in marmitas:
            marmita_vazia = campo_vazio(marmita["id"])
            if marmita_vazia:
                return False
    return True


def campo_vazio(campo):
    return not campo.strip()


# def monte_seu_kit(request, kitId):
#     kit = Kit.objects.get(id=kitId)
#     marmitas = Marmita.objects.filter(ativo=True)
#     contexto = {
#         'kit': kit,
#         'marmitas': marmitas,
#     }
#     return render(request, 'monte-seu-kit.html', contexto)


# def carrinho(request):
#     return render(request, 'carrinho.html')