

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


export function recuperaKitLocalStorage(){
    let kit = localStorage.getItem("kit")
    if(kit) return JSON.parse(kit)
    return kit
}

export function excluirKitLocalStorage(){
    localStorage.removeItem("kit")
}