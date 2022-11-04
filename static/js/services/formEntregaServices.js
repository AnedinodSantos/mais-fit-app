import { recuperaProduto } from "./produtoServices.js"
import { makeRequest} from "./tools.js"


export function pegaDadosPedidos(modalElement){
    let produto = recuperaProduto()
    let dadosCliente = extraiDadosClienteDoForm(modalElement)
    let dadosEndereco = extraiDadosEnderecoDoForm(modalElement)
    let dadoFormaPagamento = extraiFPagamentoDoForm(modalElement)
    let pedido = {}

    pedido.dadosCliente = dadosCliente
    pedido.endereco = dadosEndereco
    pedido.pagamento = dadoFormaPagamento
    pedido.produto = produto
    return pedido
}

// tratar
function extraiDadosClienteDoForm(modalElement){
    const nome = modalElement.querySelector("#txtNome")
    const CPF = modalElement.querySelector("#txtCPF")
    const dataNascimento = modalElement.querySelector("#txtDataNascimento")
    const email = modalElement.querySelector("#txtEmail")
    const telefone = modalElement.querySelector("#txtTelefone")
    let dados = {}

    dados.nome = nome.value
    dados.cpf = CPF.value
    dados.dataNascimento = dataNascimento.value
    dados.email = email.value
    dados.telefone = telefone.value
    return dados
}

function extraiDadosEnderecoDoForm(modalElement){
    const CEP = modalElement.querySelector("#txtCEP")
    const logradouro = modalElement.querySelector("#txtLogradouro")
    const numero = modalElement.querySelector("#txtNumero")
    const complemento = modalElement.querySelector("#txtComplemento")
    const bairro = modalElement.querySelector("#txtBairro")
    const cidade = modalElement.querySelector("#txtCidade")
    let dados = {}

    dados.cep = CEP.value
    dados.logradouro = logradouro.value
    dados.numero = numero.value
    dados.complemento = complemento.value
    dados.bairro = bairro.value
    dados.cidade = cidade.value

    return dados
}

function extraiFPagamentoDoForm(modalElement){
    let meiosPagamento = modalElement.querySelectorAll("[data-meio-pagamento]")
    let dado = ""
    meiosPagamento.forEach(mp => {
        if (mp.checked){
            dado = mp.value
        }
    });

    return dado
}

export async function enviaPedidoAoServidor(pedido){
    const url = "/recebe-pedido"
    const method = "post"
    const body = JSON.stringify(pedido)

    makeRequest(url, method, body)
}
