//-----------------localStorage
function setLocalStorage() {
  localStorage.setItem('name', greetingName.value);
  localStorage.setItem('city', city.value);
}

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    greetingName.value = localStorage.getItem('name');
  } else {
    setNamePlaceholder();
  }

  city.value = localStorage.getItem('city').trim() ?
    localStorage.getItem('city') :
    city.value = 'Minsk'
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
window.addEventListener('load', getWeather);

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
  const timeOfDayArr = [ 'night', 'morning', 'afternoon ', 'evening'];
  const date = new Date();
  const hours = date.getHours();
  const result = timeOfDayArr[Math.trunc(hours / 6)];
  return result;
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  greetingText.textContent = `Good ${timeOfDay}`;
}

//-----------------greeting name
const greetingName = document.querySelector('.greeting-container .name');

function setNamePlaceholder() {
    greetingName.setAttribute('placeholder', '[Enter Name]');
}

greetingName.addEventListener('change', function() {
  if (!this.value) {
    setNamePlaceholder();
  }
});

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

//-----------------weather
const apiKey = 'dc9ee2d06a07955c9a79a313d609954f';

const weatherBlock = document.querySelector('.weather');
const weatherIcon = weatherBlock.querySelector('.weather-icon');
const temperature = weatherBlock.querySelector('.temperature');
const weatherDescription = weatherBlock.querySelector('.weather-description');
const wind = weatherBlock.querySelector('.wind');
const humidity = weatherBlock.querySelector('.humidity');
const city = weatherBlock.querySelector('.city');

async function getWeather() {
  let cityVal = city.value.trim();

  if (!cityVal) {
    city.setAttribute('placeholder', '[Enter City]');
    city.value = '';
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&lang=en&appid=${apiKey}&units=metric`;
  const res = await fetch(url);

  try {
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
  } catch (error) {
    weatherIcon.className = 'weather-icon owf';
    weatherDescription.textContent = `ERROR: the location not found!`;
    temperature.textContent = ``;
    wind.textContent = ``;
    humidity.textContent = ``;
 }
}

city.addEventListener('change', getWeather);

//-----------------quotes
const qoute = document.querySelector('.quote');
const author = document.querySelector('.author');

function getQuotes() {
  const quotes = 'assets/json/data.json';
  fetch(quotes)
    .then(res => res.json())
    .then(data => {
      qoute.textContent = `"${data[randomNum].text}"`;
      author.textContent = data[randomNum].author;
      console.log(data[randomNum]);
    });
}
getQuotes();


// ----------------setTimeout
function updateMainContext() {
  showDate();
  showTime()
  showGreeting();
  setTimeout(updateMainContext, 1000);
}

updateMainContext();
