let produto = atualizaIconeCarrinho()

const placeHolder = document.getElementById("placeholder")
const spanValorTotal = document.getElementById("valor-total")

renderizaProduto(produto, placeHolder)


//cria os elementos html para renderizar cada produto (kit/marmitas) da lista
function renderizaProduto(produto, placeHolder){

    const liPrincipal = document.createElement("li")
    liPrincipal.classList.add("list-group-item")

    const divPrincipal = document.createElement("div")
    divPrincipal.classList.add("row")
    divPrincipal.setAttribute("style", "height: 10%;")

    const primeiraDiv = document.createElement("div")
    primeiraDiv.classList.add("col-4", "col-md-3", "col-lg-2")

    const img = document.createElement("img")
    img.setAttribute("src", `static/img/${produto.kit.link}`)
    img.classList.add("img-thumbnail")

    primeiraDiv.appendChild(img)

    const segundaDiv = document.createElement("div")
    segundaDiv.classList.add("col-10", "col-md-11", "col-lg-9", "col-xl-10", 
                             "text-left", "align-self-center")

    const h4 = document.createElement("h4")
    h4.classList.add("text-danger", "text-decoration-none")
    h4.innerText = produto.kit.titulo

    const h5 = document.createElement("h5")
    h5.innerText = "Marmitas do kit"

    segundaDiv.appendChild(h4)
    segundaDiv.appendChild(h5)

    const ul = document.createElement("ul")
    ul.classList.add('list-group')
    ul.setAttribute("style", "list-style: none;")

    produto.marmitas.forEach(marmita => {
        const marmitaRenderizada = marmitas(marmita)
        ul.appendChild(marmitaRenderizada)
    })

    segundaDiv.appendChild(ul)

    const spanValor = document.createElement("span")
    spanValor.classList.add("text-secondary")
    spanValor.innerText = "Valor Kit: R$ " + produto.kit.valor

    divPrincipal.appendChild(primeiraDiv)
    divPrincipal.appendChild(segundaDiv)

    liPrincipal.appendChild(divPrincipal)

    placeHolder.appendChild(liPrincipal)

    spanValorTotal.textContent = produto.kit.valor
}


function marmitas(marmita){
    const liPrincipal = document.createElement('li')

    const divPrincipal = document.createElement('div')
    divPrincipal.classList.add('row')

    const divInternaImg = document.createElement('div')
    divInternaImg.classList.add('col-4', 'col-md-3', 'col-lg-2')

    const divInternatitulo = document.createElement('div')
    divInternatitulo.classList.add('col-8', 'col-md-9', 'col-lg-7', 'col-xl-8', 'text-left', 'align-self-center')


    const img = document.createElement('img')
    img.classList.add('img-thumbnail')
    img.setAttribute('src', marmita.img)

    const tituloMarmita = document.createElement('h6')
    tituloMarmita.classList.add('text-secondary', 'text-decoration-none')
    tituloMarmita.textContent = `${marmita.titulo} - qtd: ${marmita.qtd_marmita}`



    divInternatitulo.appendChild(tituloMarmita)
    divPrincipal.appendChild(divInternatitulo)
    liPrincipal.appendChild(divPrincipal)
    return liPrincipal
}
