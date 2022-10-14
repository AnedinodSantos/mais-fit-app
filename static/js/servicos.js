export let qtdAtual = 0


// atualiza o icone do carrinho
export function atualizaIconeCarrinho(){

    const qtdProdutos = document.getElementById("qtdProd")
    let produto = JSON.parse(localStorage.getItem('produto'))
    qtdProdutos.textContent = produto ? 1:0
    return produto
}


// essa função define o kit em um objeto js e grava ele no localStorage
export function gravaKitNoLocalStorage(kit){
    const kitJson = JSON.stringify(kit)
    localStorage.setItem("kit", kitJson)
}


export function extraiKitDoHtmlComoObj(cardKit){
    let kit = {}

    const id = cardKit.dataset.kitid
    const titulo = cardKit.querySelector('[data-titulo]').dataset.titulo
    const descr = cardKit.querySelector('[data-descricao]').textContent
    const qtd = cardKit.querySelector('[data-qtd]').dataset.qtd
    const valor = cardKit.querySelector('[data-valor]').dataset.valor
    const link = cardKit.querySelector('[data-link]').dataset.link

    kit["id"] = id
    kit["titulo"] = titulo
    kit["descricao"] = descr.trim()
    kit["qtd_marmitas"] = qtd
    kit["valor"] = valor
    kit["link"] = link

    return kit
}


export function rendererizaKitModal(kit, modalkit){
    const img = modalkit.querySelector('[data-modal-kit-img]')
    const titulo = modalkit.querySelector('[data-modal-kit-titulo]')
    const descr = modalkit.querySelector('[data-modal-kit-descr]')
    const valor = modalkit.querySelector('[data-modal-kit-valor]')

    img.setAttribute('src', '/static/img/'+ kit.link)
    titulo.textContent = kit.titulo
    descr.textContent = kit.descricao
    valor.textContent = "R$ " + kit.valor
}


export function manipulaQtdMarmita(marmita, operacao, contador, qtdMax, input, btn){
    const listaDeMarmitas = JSON.parse(localStorage.getItem("marmitas")) || []
    const achouMarmita = listaDeMarmitas.find( el => el.id === marmita.id)
    let qtd = parseInt(contador.value)

    if(operacao === "-") {
        let aux = qtd - 1;

        if(aux >= 0) {
            qtdAtual -= 1;
            contador.value = qtd - 1;
            input.value = qtdAtual
            btn.disabled = true;
            retiraMarmitaLocalStorage(marmita, listaDeMarmitas, achouMarmita)
        }

    } else if (qtdAtual < qtdMax) {
        qtdAtual += 1
        contador.value = qtd + 1;
        input.value = qtdAtual
        adicionaMarmitaLocalStorage(marmita, listaDeMarmitas, achouMarmita)
    }

    verificaEnviaCarrinho(btn, qtdAtual, qtdMax)

}

function adicionaMarmitaLocalStorage(marmita, listaDeMarmitas, achouMarmita){
    
    if(achouMarmita){
        listaDeMarmitas.forEach(marmitaNaLista => {
            if(marmitaNaLista.id === marmita.id){
                marmitaNaLista.qtd += 1;
            }
        });
    } else {
        marmita.qtd = 1;
        listaDeMarmitas.push(marmita);
    }

    localStorage.setItem("marmitas", JSON.stringify(listaDeMarmitas));
}

function retiraMarmitaLocalStorage(marmita, listaDeMarmitas, achouMarmita){
    if(achouMarmita){
        listaDeMarmitas.forEach(marmitaNaLista => {
            if(marmitaNaLista.id === marmita.id){
                marmitaNaLista.qtd -= 1;
                if(marmitaNaLista.qtd === 0){
                    listaDeMarmitas = listaDeMarmitas.filter(marmita => {
                        return (marmita.qtd != 0)
                    });
                }
            }
        });
    }
    localStorage.setItem("marmitas", JSON.stringify(listaDeMarmitas));
}

export function verificaEnviaCarrinho(btn, qtdAtual, qtdMax){
    if (qtdAtual === qtdMax){
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}


export function recuperaKitLocalStorage(){
    let kit = localStorage.getItem("kit")
    if(kit) return JSON.parse(kit)
    return kit
}

export function recuperaMarmitasLocalStorage(){
    let marmitas = localStorage.getItem("marmitas")
    if(marmitas) return JSON.parse(marmitas)
    return marmitas
}

export function recuperaProduto(){
    let produto = localStorage.getItem("produto")
    if (produto) {
        return JSON.parse(produto)
    }
    return produto
}

export function extraiMarmitaDoHtmlComoObj(cardMarmita){
    let marmita = {}
    const id = cardMarmita.dataset.cardMarmitaId
    const titulo = cardMarmita.querySelector('[data-card-marmita-titulo]').dataset.cardMarmitaTitulo
    const descricao = cardMarmita.querySelector('[data-card-marmita-descricao]').textContent
    const link = cardMarmita.querySelector('[data-card-marmita-img]').dataset.cardMarmitaImg

    marmita['id'] = id
    marmita['titulo'] = titulo
    marmita['descricao'] = descricao.trim()
    marmita['link'] = link

    return marmita
}

export function criaProdutoLocalStorage(kit, marmitas){
    let produto = {}
    produto.kit = kit
    produto.marmitas = marmitas
    localStorage.setItem("produto", JSON.stringify(produto))
}


export function renderizaProdutoNoOffcanvas(ocCarrinho){
    const produto = recuperaProduto()

    const imgKit = ocCarrinho.querySelector('[data-oc-kit-img]')
    const tituloKit = ocCarrinho.querySelector('[data-oc-kit-titulo]')
    const descrKit = ocCarrinho.querySelector('[data-oc-kit-descr]')
    const valorKit = ocCarrinho.querySelector('[data-oc-kit-valor]')
    const ocBody = ocCarrinho.querySelector('[data-oc-hidden]')
    const ocMSG = ocCarrinho.querySelector('[data-oc-msg]')

    if(produto){
        imgKit.setAttribute('src', '/static/img/'+ produto.kit.link)
        tituloKit.textContent = produto.kit.titulo
        descrKit.textContent = produto.kit.descricao
        valorKit.textContent = "R$ " + produto.kit.valor
        ocMSG.hidden = true;
        ocBody.hidden = false;
    } else {
        ocMSG.textContent = 'Monte um kit e ele aparecerá aqui.'
        ocMSG.hidden = false;
        ocBody.hidden = true;
    }

}


export function excluirProdutoDoLocalStorage(){
    localStorage.removeItem("produto")
}

export function excluirKitLocalStorage(){
    localStorage.removeItem("kit")
}

export function excluirMarmitasLocalStorage(){
    localStorage.removeItem("marmitas")
}

export function zeraQtdAtual(){
    qtdAtual = 0
}