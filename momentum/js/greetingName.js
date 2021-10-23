const greetingName = document.querySelector('.greeting-container .name');

function setLocalStorage() {
  localStorage.setItem('name', greetingName.value);
}

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    greetingName.value = localStorage.getItem('name');
  }
}

function setNamePlaceholder() {
  if (!greetingName.value) {
    greetingName.setAttribute('placeholder', '[Enter Name]');
  }
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

setNamePlaceholder();