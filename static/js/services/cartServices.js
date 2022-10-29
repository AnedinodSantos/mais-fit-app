// atualiza o icone do carrinho
export function atualizaIconeCarrinho(){

    const qtdProdutos = document.getElementById("qtdProd")
    let produto = JSON.parse(localStorage.getItem('produto'))
    qtdProdutos.textContent = produto ? 1:0
    return produto
}
