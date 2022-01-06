window.onload = function () {
    let form = document.getElementById("formulaire");
    let down = document.getElementById("triangle-down");
    let up = document.getElementById("triangle-up");
    let send = document.getElementById("send");


    down.addEventListener("click", () => {
        form.style.display = "block";
        down.style.display = "none";
        up.style.display = "block";
    })


    up.addEventListener("click", () => {
        form.style.display = "none";
        down.style.display = "block";
        up.style.display = "none";
    })

    send.addEventListener("click", () => {
        if (document.form.nom.value != "" && document.form.nom.value != "") {
            alert("yes");
        } else {
            alert("le champs nom est requis");
        }

        if (!document.form.travail.checked) {
            alert("yes!")
        }
    })
}




function isChampsNotEmpty() {
    if (document.form.nom.value != "" && document.form.prenom.value != "" && document.form.mail.value != "" && document.form.site.value != "") {
        if (document.form.details.value != "") {

        }
    }
}

function isOneCheckboxChecked() {
    if (document.form.travail.checked || document.form.loisirs.checked || document.form.quotidien.checked || document.form.autre.checked) {

    }

}