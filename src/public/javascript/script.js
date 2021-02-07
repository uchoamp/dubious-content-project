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

//Paginate

var pagination = document.getElementById("pagination");


if (pagination) {
    const pageFinal = parseInt(pagination.getAttribute("data-pageFinal"))
    let pageCurrent = parseInt(location.pathname.slice(6))

    if (!pageCurrent || pageCurrent == 1) {
        pageCurrent = 1;
        tempPagination = `<a href="${pageFinal}" >&laquo;</a>`
    } else {
        
        tempPagination = `<a href="/page/${pageCurrent - 1}" >&laquo;</a>`
    }

    for (let i = 1; i <= pageFinal; i++) {
        if (i != 1 && (pageCurrent - 2) - 1 > 1 && i < pageCurrent - 2) {
            i = pageCurrent - 2
            tempPagination += `<a >...</a>`
        }if(i != pageFinal && i == pageCurrent + 3 && pageFinal - (pageCurrent + 2)>1 ){
            i = pageFinal
            tempPagination += `<a >...</a>`
        }
        if(i == pageCurrent){
            tempPagination += `<a class="active"href="/page/${i}" >${i}</a>`
        }else{
            tempPagination += `<a href="/page/${i}" >${i}</a>`
        }
        

    }

    if(pageCurrent == pageFinal){
        tempPagination += `<a href="/page/1">&raquo;</a>`
    }else{
        tempPagination += `<a href="/page/${pageCurrent + 1}">&raquo;</a>`    
    }
    

    pagination.innerHTML = tempPagination;


}