/////////////////////////////////
//          HOME ADMIN        //
////////////////////////////////

const table_games = document.getElementById("table-games");


if (table_games) {
  const search = document.getElementById("search")
  const paginate = document.getElementById("paginate")
  const tbody = table_games.children[1];
  const clone = tbody.children[0].cloneNode(true);

  const searchInput = search.children[0];

  searchInput.addEventListener('input', () => {
    if (!searchInput.value) {
      renderGames(1)
    }
  })
  // mostra o games quando a pagina for carregada pela primeira vez //
  renderGames(1)

  // Search //
  search.children[1].onclick = function () {
    nextPage(1);
  }

  // Modança de página //
  function nextPage(page) {
    renderGames(page, searchInput.value);

  }

  // buscar o games no backend //
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




        removeAllChild(tbody)
        let tr = clone.cloneNode(true);

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
          tr.children[9].innerHTML = game.size
          tr.children[10].children[0].children[0].href = game.download

          tbody.appendChild(tr)

        });

        createPaginate(page, res.totalPages)

      }).catch(console.error);


  }
  // criação do paginate //
  function createPaginate(page, pageFinal) {
    page = parseInt(page)

    let template = ""
    if ((page - 2) - 1 >= 2) {
      template += `<button onclick="nextPage(this.getAttribute('data-page'))" data-page="${page - 1}"><i class="fas fa-angle-double-left"></i></button>`
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
        i = pageFinal - 1;
        template += '<span>...</span>';
      }

    }

    if (page < pageFinal - 4) {
      template += `<button onclick="nextPage(this.getAttribute('data-page'))" data-page="${page + 1}"><i class="fas fa-angle-double-right"></i></button>`
    }
    paginate.innerHTML = template

  }
}

/////////////////////////////////
//          NEW GAME          //
////////////////////////////////



if (document.getElementById("form-create-game")) {
  //  Input  CAPA   //
  const cover = document.getElementById("cover");
  const img_cover = document.getElementById("img-cover")
  cover.onchange = () => {
    console.log("djalçsk")
    let fr = new FileReader();
    fr.onload = () => {
      img_cover.src = fr.result;
    }
    fr.readAsDataURL(cover.files[0]);
  }

  // Inputs screenshorts //
  document.getElementById("form-create-game").reset();

  const inputs_sc = document.getElementById("inputs-sc")
  if (inputs_sc) {
    const fr = new FileReader();
    let screenshorts = document.getElementById("screenshorts");

    let inputs_file = inputs_sc.children;
    let screenshorts_children = screenshorts.children

    for (let i = 0; i < inputs_file.length; i++) {
      inputs_file[i].children[0].onchange = () => {
        fr.onload = () => {
          screenshorts_children[i].children[0].src = fr.result;
        }
        fr.readAsDataURL(inputs_file[i].children[0].files[0])
      }

    }

    function resetInFileImgs(index) {
      inputs_file[index].children[0].type = "";
      inputs_file[index].children[0].type = "file";
      screenshorts_children[index].children[0].src = "/img/main/screenshort-exemple.png"

    }

  }


  // Inputs events //
  const tittle = document.getElementById("tittle");
  tittle.addEventListener("input", () => {
    document.getElementById("tittle-here").innerText = tittle.value;
  })

  const size_game = document.getElementById("size-game");
  size_game.addEventListener("input", () => {
    document.getElementById("here-size-game").innerText = size_game.value;
  })

  const link_download = document.getElementById("link_download");
  link_download.addEventListener("input", ()=>{
    let btn_down = document.getElementById("btn-down");
    if(link_download.value.length > 0){
      btn_down.classList.remove("inative-btn-down");
      btn_down.href = link_download.value;
    }else{
      btn_down.classList.add("inative-btn-down");
      btn_down.href = "javascript:void(0)"
    }
  })









}












// Funções
function removeAllChild(parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}