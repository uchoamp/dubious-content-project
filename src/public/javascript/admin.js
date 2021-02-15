// Mostra games
const table_games = document.getElementById("table-games");

fetch("/games?page=1&limit=10&query=").then(res => {

  // valida se a requisição falhou
  if (!res.ok) {
    return new Error('falhou a requisição') // cairá no catch da promise
  }

  // verificando pelo status
  if (res.status === 404) {
    return new Error('não encontrou qualquer resultado')
  }
  return res.json()
})
  .then((res) => {

    let games = res.games

    let tbody = table_games.children[1]



    let tr = tbody.children[0].cloneNode(true);

    while (tbody.lastChild) {
      tbody.removeChild(tbody.lastChild)
    }



    let td = undefined;
    games.forEach(game => {
      tr = tr.cloneNode(true)
      
      tr.setAttribute("data-id", game._id)
      tr.children[0].children[0].src = game.img
      tr.children[1].innerHTML = game.tittle
      tr.children[2].children[0].innerHTML = game.description
      tr.children[3].innerHTML = game.type
      tr.children[4].innerHTML = game.lingue
      tr.children[5].innerHTML = game.tags
      tr.children[6].innerHTML = game.censorship
      tr.children[7].innerHTML = game.platform
      tr.children[8].innerHTML = game.release_date

      tbody.appendChild(tr)

    });


  }).catch(console.error);

