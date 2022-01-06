/*****  MODAL  ******/
let modal = null;
const focusSelector = 'a, button, input, th, td, tr, table';
let focusElements = [];
let focusEltSelectedBefore = null;

const openModal = function (e) {
	e.preventDefault();
	modal = document.querySelector("#maModal");
	focusElements = Array.from(modal.querySelectorAll(focusSelector));
	//trouver l'élément qui est sélectionné et le sauvegarder dans la variable
	focusEltSelectedBefore = document.querySelector(':focus');
	//par défaut l'élément focus se trouve au début
	focusElements[0].focus();
	modal.style.display = null;
	modal.removeAttribute('aria-hidden');
	modal.setAttribute('aria-modal', 'true');
	modal.addEventListener('click', closeModal);
	modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
	modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}

//fonction pour fermer la fenêtre modal
const closeModal = function (e) {
	if (modal === null) return
	//avant de perdre l'élément focus précédent la modal, on la lui redonne
	if (focusEltSelectedBefore !== null) {
		focusEltSelectedBefore.focus();
	}
	e.preventDefault();
	modal.setAttribute('aria-hidden', 'true');
	modal.removeAttribute('aria-modal');
	modal.removeEventListener('click', closeModal);
	//une fois la modal fermée on annule les évenements sur le bouton fermer et stop
	modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
	//modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
	//pour cacher la modal avec un délai (fin de l'animation)
	const hideModal = function () {
		modal.style.display = "none";
		modal.removeEventListener('animationend', hideModal);
		modal = null;
	}

	modal.addEventListener('animationend', hideModal);

}

//fonction pour empêcher de fermer la modal quand on clique sur la modale
const stopPropagation = function (e) {
	e.stopPropagation();
}

/*fonction pour programmer le comportement de la touche tab 
-> accessibilité pour le clavier
-> lire la modal via le clavier 
*/
const focusInModal = function (e) {
	e.preventDefault();
	//trouver l'index de l'élément qui a un focus
	let index = focusElements.findIndex(eltFocus => eltFocus === modal.querySelector(':focus'))

	if (e.shiftKey === true) {
		//enlever un cran pour se déplacer vers le haut
		index--;
	} else {
		//rajouter un cran pour se déplacer vers le bas
		index++;
	}

	//si l'index de l'élément focus se trouve au début
	if (index < 0) {
		//on le remet au dernier élément focus
		index = focusElements.length - 1;
	}

	//si l'index est sup ou égale à la taille des éléments focus pour revenir à zéro-> au début
	if (index >= focusElements.length) {
		index = 0;
	}
	focusElements[index].focus();
}

let form = document.getElementById("formulaire");
let down = document.getElementById("triangle-down");
let up = document.getElementById("triangle-up");
let alert = document.querySelector(".alert-succes");

const openForm = function () {
alert.style.visibility = "hidden"
	form.style.display = "block";
	down.style.display = "none";
	up.style.display = "block";
}

const closeForm = function () {
	form.style.display = "none";
	down.style.display = "block";
	up.style.display = "none";
}

const sendForm = function (e) {
	e.preventDefault();
	form.style.display = "none";
	down.style.display = "block";
	up.style.display = "none";
	const anim = function () {
		alert.style.visibility = "visible"
		// alert.style.opacity = 1;
	}
	setTimeout(anim, 500);

	resetForm();

}

const resetForm = function () {
	document.querySelectorAll("input").forEach(elt => elt.value = "");
	document.querySelectorAll("textarea").forEach(elt => elt.value = "");
}

document.querySelector("#triangle-down").addEventListener('click', openForm);
document.querySelector("#triangle-up").addEventListener('click', closeForm);
document.querySelector('#js-modal').addEventListener('click', openModal);
document.querySelector("#send").addEventListener('click', sendForm);


window.addEventListener('keydown', (e) => {
	if (e.key === "Escape" || e.key === "Esc") {
		closeModal(e)
	}

	if (e.key === "Tab" && modal !== null) {
		focusInModal(e);
	}
})


