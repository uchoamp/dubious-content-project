//User Profile

function dropProfileOptions() {
  document.getElementById("userOptions").classList.toggle("show");
}


// Modal screenShorts
var modal = document.getElementById("myModal");
if (modal) {
  document.getElementById("myImage1").onclick = clickIamge;
  document.getElementById("myImage2").onclick = clickIamge;
  document.getElementById("myImage3").onclick = clickIamge;
  document.getElementById("myImage4").onclick = clickIamge;
  
  modal.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  };
}

function clickIamge() {
  document.getElementById("myModal").style.display = "block";
  document.getElementById("modalImage").src = this.src;
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

// Textarea responsivo
const tx = document.getElementById("commentText");
if (tx) {
  tx.setAttribute("style", "height:" + tx.scrollHeight + "px;");
  tx.addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
}

//Close msg
var closeMsg = document.getElementsByClassName("closeMsg");
if (closeMsg) {
  for (var ele in closeMsg) {
    closeMsg[ele].onclick = function () {
      this.parentElement.remove();
    };
  }
}


