

const botoesEscolher = document.querySelectorAll("[data-escolher]")

botoesEscolher.forEach(btn => {
    btn.onclick = evento => {
        const footerCard = evento.target.parentNode
        const card = footerCard.parentNode
        //capturando dados do kit escolhido
        let kit = {}

        const id = card.dataset.kitid
        const titulo = card.querySelector('[data-titulo]').dataset.titulo
        const descricao = card.querySelector("[data-descricao]").textContent
        const qtd = footerCard.dataset.qtd
        const valor = card.querySelector("[data-valor]").dataset.valor
        const link = card.querySelector("[data-link]").dataset.link

        kit["id"] = id
        kit["titulo"] = titulo
        kit["descricao"] = descricao.trim()
        kit["qtd_marmitas"] = qtd
        kit["valor"] = valor
        kit["link"] = link

        const kitStr = JSON.stringify(kit)

        localStorage.setItem("kit", kitStr)

        window.location = "/monte-seu-kit/"+id
    }
})