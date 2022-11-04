import { atualizaIconeCarrinho} from "./services/cartServices.js"
import { qtdAtual, zeraQtdAtual, verificaEnviaCarrinho } from "./services/marmitaServices.js"
import { manipulaQtdMarmita, recuperaMarmitasLocalStorage, extraiMarmitaDoHtmlComoObj,  excluirMarmitasLocalStorage} from "./services/marmitaServices.js"
import { criaProdutoLocalStorage, renderizaProdutoNoOffcanvas, excluirProdutoDoLocalStorage } from "./services/produtoServices.js"
import { gravaKitNoLocalStorage, extraiKitDoHtmlComoObj, rendererizaKitModal, recuperaKitLocalStorage, excluirKitLocalStorage } from "./services/kitServices.js"
<<<<<<< HEAD
import { validarCPF, localizarEndereco, validarMaioridade, validarNomeCompleto, validarNumeroTelefone, validarEmail } from "./services/validacaoServices.js"
=======
import { enviaPedidoAoServidor,pegaDadosPedidos } from "./services/formEntregaServices.js"
>>>>>>> dinodev

const btnCarrinho = document.querySelector('[data-btn-carrinho]')
const ocCarrinho = document.querySelector('[data-oc-carrinho]')
const ocBtnExcluir = ocCarrinho.querySelector('[data-oc-btn-excluir]')
const botoesDosKits = document.querySelectorAll("[data-escolher]")
const marmitasCards = document.querySelectorAll("[data-card-marmita-id]")
const modalkit = document.querySelector('[data-modalkit]')
const btnEnviaCarrinho = modalkit.querySelector('[data-modal-btn-carrinho]')
const inputQtdMarmitasEscolhidas = modalkit.querySelector('[data-modal-kit-qtd]')
const btnsCloseModal = document.querySelectorAll('[data-modal-marmita-close]')

const modalDadosEntrega = document.getElementById("entregaModal")
<<<<<<< HEAD

const inputNomeCompleto = document.querySelector("#txtNome")
const inputCPF = document.querySelector("#txtCPF")
const inputDataNascimento = document.querySelector("#txtDataNascimento")
const inputEmail = document.querySelector("#txtEmail")
const inputTelefone = document.querySelector("#txtTelefone")
const inputCEP = document.querySelector("#txtCEP")
=======
const btnConcluirPedido = modalDadosEntrega.querySelector("[data-conclui-pedido]")
>>>>>>> dinodev

atualizaIconeCarrinho()

// ações do botão de cada kit
botoesDosKits.forEach(btn => {
    btn.onclick = evento => {
        const cardKit = evento.target.parentNode.parentNode
        const kit = extraiKitDoHtmlComoObj(cardKit)

        gravaKitNoLocalStorage(kit)
        rendererizaKitModal(kit, modalkit)
        verificaEnviaCarrinho(btnEnviaCarrinho, qtdAtual, kit.qtd_marmitas)
    }
});

// ações dos botões de cada marmita
marmitasCards.forEach(cardMarmita => {
    const btnControladores = cardMarmita.querySelectorAll('[data-controle]')
    const contador = cardMarmita.querySelector('[data-contador]')
    const marmita = extraiMarmitaDoHtmlComoObj(cardMarmita)

    btnControladores.forEach(btnCtrl => {
        btnCtrl.onclick = () => {
            const kit = recuperaKitLocalStorage()
            const qtdMaxMarmitas = parseInt(kit.qtd_marmitas)
            const operacao = btnCtrl.dataset.controle

            manipulaQtdMarmita(marmita, operacao, contador, qtdMaxMarmitas, inputQtdMarmitasEscolhidas, btnEnviaCarrinho)
        }
    });
});

btnEnviaCarrinho.onclick = () => {
    const kit = recuperaKitLocalStorage()
    const marmitas = recuperaMarmitasLocalStorage()
    // encapsular isso
    const contadores = document.querySelectorAll('[data-contador]')
    contadores.forEach(contador => {
        contador.value = 0
    });

    excluirMarmitasLocalStorage()
    excluirKitLocalStorage()
    modalkit.querySelector('[data-modal-kit-qtd]').value = 0;
    zeraQtdAtual()
    // encapsular isso

    criaProdutoLocalStorage(kit, marmitas)
    atualizaIconeCarrinho()
    btnCarrinho.click();
};

btnCarrinho.onclick = () => {
    renderizaProdutoNoOffcanvas(ocCarrinho)
}

ocBtnExcluir.onclick = () => {
    excluirProdutoDoLocalStorage()
    excluirKitLocalStorage()
    excluirMarmitasLocalStorage()
    renderizaProdutoNoOffcanvas(ocCarrinho)
    atualizaIconeCarrinho()
}


btnsCloseModal.forEach(btn => {
    btn.onclick = () => {
        const contadores = document.querySelectorAll('[data-contador]')
        contadores.forEach(contador => {
            contador.value = 0
        });

        excluirMarmitasLocalStorage()
        excluirKitLocalStorage()
        modalkit.querySelector('[data-modal-kit-qtd]').value = 0;
        zeraQtdAtual()
    }
});


inputNomeCompleto.addEventListener('change', function(e){
    e.preventDefault()
    let nomeCompleto = document.querySelector("#txtNome").value
    validarNomeCompleto(nomeCompleto)
})


inputCPF.addEventListener('change', function(e){
    e.preventDefault()
    let cpf = document.querySelector("#txtCPF").value
    validarCPF(cpf)
})


inputDataNascimento.addEventListener('change', function(e){
    e.preventDefault()
    let dataNascimento = document.querySelector("#txtDataNascimento").value
    validarMaioridade(dataNascimento)
})


inputEmail.addEventListener('change', function(e){
    e.preventDefault()
    let email = document.querySelector("#txtEmail").value
    validarEmail(email)
})


inputTelefone.addEventListener('change', function(e){
    e.preventDefault()
    let numeroTelefone = document.querySelector("#txtTelefone").value
    validarNumeroTelefone(numeroTelefone)
})


inputCEP.addEventListener('change', function(e){
    e.preventDefault()
    let cep = document.querySelector("#txtCEP").value
    localizarEndereco(cep)
})
btnConcluirPedido.onclick = () => {
    let pedido = pegaDadosPedidos(modalDadosEntrega)
    enviaPedidoAoServidor(pedido)
}
