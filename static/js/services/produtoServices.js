

export function recuperaProduto(){
    let produto = localStorage.getItem("produto")
    if (produto) {
        return JSON.parse(produto)
    }
    return produto
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
