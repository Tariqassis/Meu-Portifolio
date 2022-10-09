var header = document.getElementById("header")
var menubtn = document.getElementById("menubtn")

menubtn.onclick = function () {
    menubtn.classList.toggle('fa-xmark');
    header.classList.toggle('active');
    document.body.classList.toggle('active');
}