const button = document.querySelector(".button");
const hiddenWord = button.querySelector('span')

function btnClick() {
  hiddenWord.classList.toggle('hidden')
}

button.addEventListener("click", btnClick);
