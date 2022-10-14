import { atualizaIconeCarrinho, excluirKitLocalStorage, excluirMarmitasLocalStorage, zeraQtdAtual } from "./servicos.js"
import { gravaKitNoLocalStorage } from "./servicos.js"
import { rendererizaKitModal } from "./servicos.js"
import { renderizaProdutoNoOffcanvas } from "./servicos.js"
import { extraiKitDoHtmlComoObj } from "./servicos.js"
import { manipulaQtdMarmita } from "./servicos.js"
import { recuperaKitLocalStorage } from "./servicos.js"
import { recuperaMarmitasLocalStorage } from "./servicos.js"
import { criaProdutoLocalStorage } from "./servicos.js"
import { verificaEnviaCarrinho } from "./servicos.js"
import { extraiMarmitaDoHtmlComoObj } from "./servicos.js"
import { excluirProdutoDoLocalStorage } from "./servicos.js"
import { qtdAtual } from "./servicos.js"

const btnCarrinho = document.querySelector('[data-btn-carrinho]')
const ocCarrinho = document.querySelector('[data-oc-carrinho]')
const ocBtnExcluir = ocCarrinho.querySelector('[data-oc-btn-excluir]')
const botoesDosKits = document.querySelectorAll("[data-escolher]")
const marmitasCards = document.querySelectorAll("[data-card-marmita-id]")
const modalkit = document.querySelector('[data-modalkit]')
const btnEnviaCarrinho = modalkit.querySelector('[data-modal-btn-carrinho]')
const inputQtdMarmitasEscolhidas = modalkit.querySelector('[data-modal-kit-qtd]')
const btnsCloseModal = document.querySelectorAll('[data-modal-marmita-close]')



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
