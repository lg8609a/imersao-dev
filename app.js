function removerAcentos(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function buscar() {
  let section = document.getElementById("resultados-pesquisa")

  let campoPesquisa = removerAcentos(
    document.getElementById("campo-pesquisa").value.toLowerCase()
  )

  if (campoPesquisa == "" || /^\s+$/.test(campoPesquisa)) {
    section.innerHTML = "<p>Insira uma busca válida</p>"
    return
  }

  let resultados = ""
  let encontrouResultado = false

  for (let dado of dados) {
    const animalNormalizado = removerAcentos(dado.animal.toLowerCase())
    const descricaoNormalizada = removerAcentos(dado.descricao.toLowerCase())

    if (
      animalNormalizado.includes(campoPesquisa) ||
      descricaoNormalizada.includes(campoPesquisa)
    ) {
      resultados += `
      <div class="item-resultado">
          <h2>
              <p class=>${dado.animal}</p>
          </h2>
          <p class="descricao-meta">${dado.descricao}</p>
          <a href=${dado.link} target="_blank">Mais Informações</a>
  </div>
  `
      encontrouResultado = true
    }
  }
  if (!encontrouResultado) {
    section.innerHTML = "<p>Nenhum resultado encontrado</p>"
  } else {
    section.innerHTML = resultados
  }
}

document
  .getElementById("campo-pesquisa")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      buscar()
    }
  })
