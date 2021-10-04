const video = document.getElementById('video');
const videoWorks = !!document.createElement('video').canPlayType;
if (videoWorks) {
  video.removeAttribute('controls');
}

const progress = document.querySelector('.progress');
progress.addEventListener('input', function() {
  const progressValue = this.value;
  this.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${progressValue}%, #c4c4c4 ${progressValue}%, #c4c4c4 100%)`
})

const volume = document.querySelector('.volume');
volume.addEventListener('input', function() {
  const volumeValue = this.value;
  this.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${volumeValue}%, #c4c4c4 ${volumeValue}%, #c4c4c4 100%)`
})

const pictureInnerContainer = document.querySelector('.picture-inner-container');
let imgArr = [];
let resultStr = '';

for(let i = 1; i < 16; i++) {
  imgArr.push(`assets/img/galery/galery${i}.jpg`);
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

shuffle(imgArr);

imgArr.forEach(el => {
  resultStr += `<img class="gallery-img" src="${el}" alt="Art Gallery">`
})

pictureInnerContainer.innerHTML = resultStr;

const asideMenu = document.querySelector('.header-navigation');
const burger = document.querySelector('.nav-btn');
const burgerCheckbox = document.querySelector('.nav-toggle');

document.addEventListener('click', e => {
  console.log('hereeee', e.target)
  let target = e.target;
  let isBurger = target == burger;
  let burgerIsChecked = burgerCheckbox.checked;

  if (e.target !== asideMenu  && !isBurger && burgerIsChecked && e.target !== burgerCheckbox) {
    burgerCheckbox.checked = false;
  }
})
