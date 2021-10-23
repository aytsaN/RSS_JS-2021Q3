// ----------------date
const date = document.querySelector('.date');

function showDate() {
  const dateObj = new Date();
  const options = {month: 'long', weekday: 'long', day: 'numeric'};
  const currentDate = dateObj.toLocaleDateString(undefined, options);
  date.textContent = `${currentDate}`;
}

// ----------------time
const time = document.querySelector('.time');

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString('en-GB');
  time.textContent = currentTime;
}

// ----------------greeting
const greetingContainer = document.querySelector('.greeting-container');
const greetingText = greetingContainer.querySelector('.greeting');

function getTimeOfDay() {
  const timeOfDayArr = ['morning', 'afternoon ', 'evening', 'night'];
  const date = new Date();
  const hours = date.getHours();
  const result = timeOfDayArr[Math.trunc(hours / 6) - 1];
  return result;
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  greetingText.textContent = `Good ${timeOfDay}`;
}

//-----------------update bg image
const body = document.body;
let randomNum = 1;

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
}

function setBg() {
  const timeOfDay = getTimeOfDay();
  const bgNum = randomNum.toString();
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum.padStart(2, '0')}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url("${img.src}"`;
  };
}

getRandomNum(1, 20);
setBg();

//----------------slide bg
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

function getSlideNext() {
  randomNum < 20 ? randomNum++ : randomNum = 1;
  setBg();
}

function getSlidePrev() {
  randomNum > 1 ? randomNum-- : randomNum = 20;
  setBg();
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

// ----------------setTimeout
function updateMainContext() {
  showDate();
  showTime()
  showGreeting();
  setTimeout(updateMainContext, 1000);
}

updateMainContext();
