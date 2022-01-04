window.onload = function () {
    let form = document.getElementById("formulaire");
    let down = document.getElementById("triangle-down");
    let up = document.getElementById("triangle-up");


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
}

