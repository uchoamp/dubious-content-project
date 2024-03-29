// reponsividade
const header_center = document.getElementsByClassName("header-center")[0];
if (header_center) {
    function searchResp() {
        if (window.matchMedia("(max-width: 900px)").matches) {
            header_center.parentNode.append(header_center);
        } else {
            header_center.parentNode.insertBefore(header_center, header_center.parentNode.childNodes[3]);
        }
    }
    searchResp()
}
// window.addEventListener("resize",searchResp)

// nav dropdown

function dropDropdown(btn) {
    let dropdown = btn.parentElement;
    let dropdown_content = btn.parentElement.children[1];
    if (document.getElementsByClassName("show")[0] && document.getElementsByClassName("show")[0] != dropdown_content) {
        document.getElementsByClassName("show")[0].classList.remove("show");
        document.getElementsByClassName("show-to-btn")[0].classList.remove("show-to-btn");
    }
    dropdown_content.classList.toggle("show");
    btn.classList.toggle("show-to-btn")
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {

        if (document.getElementsByClassName("show")[0]) {
            document.getElementsByClassName("show")[0].classList.remove('show');
            document.getElementsByClassName("show-to-btn")[0].classList.remove('show-to-btn');

        }
    }
}



// Swap icon platform
const platforms_games = document.getElementsByClassName("swap-platform-icon");

for (element of platforms_games) {
    let platform = element.children[1].textContent;
    element.children[0].classList.add("fa-" + platform.toLowerCase());
}



// Modal screenShorts
var modal = document.getElementById("myModal");
if (modal) {
    let screenshorts = document.getElementsByClassName("screenshort");

    for (let i = 0; i < screenshorts.length; i++) {
        screenshorts[i].onclick = clickIamge;

    }

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
    for (let i = 0; i < closeMsg.length; i++) {
        closeMsg[i].onclick = function () {
            this.parentElement.remove();
        };
        setTimeout(function () {
            if (closeMsg[i]) {
                closeMsg[i].parentElement.remove();
            }


        }, 7000)

    }


}




//Paginate

var pagination = document.getElementById("pagination");


if (pagination) {

    const pageFinal = parseInt(pagination.getAttribute("data-pageFinal"))
    let url = new URL(window.location.href);

    let pageCurrent = parseInt(location.pathname.slice(6));
    let pathIni = "/page/";
    let pathURL = url.pathname;

    if (pathURL == "/search") {
        pageCurrent = parseInt(url.searchParams.get("p"))
        pathIni = "/search?q=" + url.searchParams.get("q") + "&l=9&p="
    }
    else {
        let regexPathC = /^\/c\/[a-z]+\/[a-z]+\/\d+/i;
        if (regexPathC.test(pathURL)) {
            pathIni = pathURL.match(/^\/c\/[a-z]+\/[a-z]+\//i).toString()
            pageCurrent = parseInt(pathURL.slice(pathIni.length))
        }
    }


    if (!pageCurrent || pageCurrent == 1) {
        pageCurrent = 1;
        tempPagination = `<a href="${pathIni}${pageFinal}" >&laquo;</a>`
    } else {

        tempPagination = `<a href="${pathIni}${pageCurrent - 1}" >&laquo;</a>`
    }

    for (let i = 1; i <= pageFinal; i++) {
        if (i != 1 && (pageCurrent - 2) - 1 > 1 && i < pageCurrent - 2) {
            i = pageCurrent - 2
            tempPagination += `<a class="noHover">...</a>`
        } if (i != pageFinal && i == pageCurrent + 3 && pageFinal - (pageCurrent + 2) > 1) {
            i = pageFinal
            tempPagination += `<a class="noHover">...</a>`
        }
        if (i == pageCurrent) {
            tempPagination += `<a class="active"href="${pathIni}${i}" >${i}</a>`
        } else {
            tempPagination += `<a href="${pathIni}${i}" >${i}</a>`
        }

    }

    if (pageCurrent == pageFinal) {
        tempPagination += `<a href="${pathIni}1">&raquo;</a>`
    } else {
        tempPagination += `<a href="${pathIni}${pageCurrent + 1}">&raquo;</a>`
    }

    pagination.innerHTML = tempPagination;
}

