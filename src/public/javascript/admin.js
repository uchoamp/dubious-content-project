// Mostra games
const table_games = document.getElementById("table-games");
const search = document.getElementById("search")
const paginate = document.getElementById("paginate")
const tbody = table_games.children[1];
const clone = tbody.children[0].cloneNode(true);

const searchInput = search.children[0];

searchInput.addEventListener('input',()=>{

  if(!searchInput.value){
    renderGames(1)
  }
})
// mostra o games quando a pagina for carregada pela primeira vez
renderGames(1)

// Funções
search.children[1].onclick = function () {
    nextPage(1);
}

function nextPage(page) {
  renderGames(page, searchInput.value);

}

function renderGames(page, query) {
  fetch(`/games?page=${page || ""}&limit=10&query=${query || ""}`).then(res => {

    if (!res.ok) {
      return new Error('falhou a requisição')
    }

    if (res.status === 404) {
      return new Error('não encontrou qualquer resultado')
    }

    return res.json()
  })
    .then((res) => {

      let games = res.games
      

      let tr = clone.cloneNode(true);

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
        tr.children[9].children[0].children[0].href = game.download

        tbody.appendChild(tr)

      });

      createPaginate(page, res.totalPages)

    }).catch(console.error);


}

function createPaginate(page, pageFinal) {
  page = parseInt(page)
  
  let template = ""
  if ((page - 2) - 1 >= 2) {
    template += `<button onclick="nextPage(this.getAttribute('data-page'))" data-page="${page-1}"><i class="fas fa-angle-double-left"></i></button>`
  }

  for (let i = 1; i <= pageFinal; i++) {

    if (i == page) {
      template += `<button disabled>${i}</button>`
      continue
    }
    
    template += `<button onclick="nextPage(this.innerText)">${i}</button>`
    if (i == 1 && page - 3 > 1) {
      i = page - 3;
      template += '<span>...</span>'
      
    } if (page + 4 < pageFinal && page + 2 == i) {
      i = pageFinal-1;
      template += '<span>...</span>';
    } 
    


  }

  if (page < pageFinal - 4) {
    template += `<button onclick="nextPage(this.getAttribute('data-page'))" data-page="${page+1}"><i class="fas fa-angle-double-right"></i></button>`
  }
  paginate.innerHTML = template

}