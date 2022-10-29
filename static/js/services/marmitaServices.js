export let qtdAtual = 0


export function zeraQtdAtual(){
    qtdAtual = 0
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


export function recuperaMarmitasLocalStorage(){
    let marmitas = localStorage.getItem("marmitas")
    if(marmitas) return JSON.parse(marmitas)
    return marmitas
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


export function excluirMarmitasLocalStorage(){
    localStorage.removeItem("marmitas")
}


export function verificaEnviaCarrinho(btn, qtdAtual, qtdMax){
    if (qtdAtual === qtdMax){
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}