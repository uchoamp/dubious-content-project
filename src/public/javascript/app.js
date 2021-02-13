var comentar = document.getElementById("comentar");
var commentsDiv = document.getElementById("comments");
var myUsername = document.getElementById("myUsername");
const hgameId = location.pathname.slice(7);
var xhttp = new XMLHttpRequest();

// configuração do observador:
var config = { attributes: true, childList: true, characterData: true };

if (comentar && commentsDiv) {
  fetchComments();

  //Criando comenterio
  var btnComment = document.getElementById("btnComment");
  var commentTextArea = document.getElementById("commentText");
  btnComment.addEventListener("click", addComment);

  //Excluir comentario
  if (myUsername) {
    var observer = new MutationObserver((mutations) => {
      var commentsDel = document.getElementsByClassName("deleteComment");
      if (commentsDel.length) {
        for (let key = 0; key < commentsDel.length; key++) {
          commentsDelete(commentsDel[key]);
        }
      }
    });
    // passar o nó alvo, bem como as opções de observação
    observer.observe(commentsDiv, config);
  }
}

// adicionando comentario
function addComment() {
  var commentText = commentTextArea.value;
  if (commentText.trim() != "") {
    xhttp.open("POST", `/comment`, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`comment=${commentText}&hgame_id=${hgameId}`);
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          commentTextArea.value = "";
          commentTextArea.removeAttribute("style");
          fetchComments();
        }
        if (this.status == 403) {
          window.location.href = "/" + this.response;
        }
      }
    };
  }
}

// Mostra comentario
function fetchComments() {
  xhttp.open("GET", `/comment?hgame_id=${hgameId}`, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const comments = JSON.parse(this.response);
      var template = ``;
      comments.forEach((comment) => {
        var dateComment = new Date(comment.createdAt);
        dateComment =
          adicionaZero(dateComment.getDate().toString()) +
          "/" +
          adicionaZero(dateComment.getMonth() + 1).toString() +
          "/" +
          dateComment.getFullYear() +
          " " +
          adicionaZero(dateComment.getHours().toString()) +
          ":" +
          adicionaZero(dateComment.getMinutes().toString()) +
          ":" +
          adicionaZero(dateComment.getSeconds().toString());
        template += `<div class="comment-responses">
        <div class="comment" data-commentId='${comment._id}'>
            <div class="comment-info">
                <strong>${comment.userCommenter.username} </strong><span> ${dateComment}</span>`;

        if (myUsername) {
          if (comment.userCommenter.username == myUsername.text) {
            template += `<a class='deleteComment'><i class="fas fa-trash-alt"></i> Excluir</a>`;
          }
        }

        template += `
        </div>
          <pre class="comment-text">${comment.comment}</pre>
        
        </div>
            <div class="responses"></div>
        </div>
            `;
        // <div class="comment-actions">
        //   <button id='like'>
        //         <i class="fa fa-thumbs-up"></i> <span>1</span>
        //   </button>
        //   <button style="margin-left: 4px;" id='reply'>
        //         <i class="fa fa-reply"></i> <span>reply</span>
        //    </button>
        // </div>
      });
      commentsDiv.innerHTML = template;
    }
  };
}

function commentsDelete(commentDel) {
  commentDel.addEventListener("click", function () {
    xhttp.open(
      "DELETE",
      `/comment?comment_id=${this.parentElement.parentElement.getAttribute(
        "data-commentid"
      )}`,
      true
    );
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          fetchComments();
        }
      } else if (this.status == 407) {
        console.log(this.response);
        window.location.replace("/login");
      } else if (this.status == 401) {
        window.location.replace("/login");
      }
    };
    this.remove();
  });
}

// Mostra games
const table_games = document.getElementById("table-games");

if (table_games) {
  fetch("/games?page=1&limit=4&query=").then(res => {
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
    .then((games) => {
      console.log(games)


    }).catch(console.error);

  
}

// formata data
function adicionaZero(numero) {
  if (numero <= 9) return "0" + numero;
  else return numero;
}


