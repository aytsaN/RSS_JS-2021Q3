//-----------------num randomizer
function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
  const timeOfDayArr = [ 'night', 'morning', 'afternoon', 'evening'];
  const date = new Date();
  const hours = date.getHours();
  const result = timeOfDayArr[Math.trunc(hours / 6)];
  return result;
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  greetingText.textContent = `Good ${timeOfDay},`;
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
let randomBGNum = getRandomNum(1, 20);

function setBg() {
  const timeOfDay = getTimeOfDay();
  const bgNum = randomBGNum.toString();
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum.padStart(2, '0')}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url("${img.src}"`;
  };
}

setBg();

//----------------slide bg
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

function getSlideNext() {
  randomBGNum < 20 ? randomBGNum++ : randomBGNum = 1;
  setBg();
}

function getSlidePrev() {
  randomBGNum > 1 ? randomBGNum-- : randomBGNum = 20;
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
const changeQuoteIco = document.querySelector('.change-quote');

function getQuotes() {
  const quotes = 'assets/json/data.json';

  fetch(quotes)
    .then(res => res.json())
    .then(data => {
      let randomQuoteNum = getRandomNum(1, data.length - 1);
      qoute.textContent = `"${data[randomQuoteNum].text}"`;
      author.textContent = data[randomQuoteNum].author || 'author is unknown, but the quote is coool';
    })
    .catch(err => {
      qoute.textContent = `No quotes for today`;
      author.textContent = `¯\\_(ツ)_/¯`;
    });
}
getQuotes();

changeQuoteIco.addEventListener('click', getQuotes);

// ----------------setTimeout
function updateMainContext() {
  showDate();
  showTime()
  showGreeting();
  setTimeout(updateMainContext, 1000);
}

updateMainContext();
