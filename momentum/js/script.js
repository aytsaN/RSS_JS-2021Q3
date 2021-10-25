let userLanguage;
const localization = {
  'en' : {
    'greeting' : {
      'night' : 'Good Night',
      'morning' : 'Good Morning',
      'afternoon' : 'Good Afternoon',
      'evening' : 'Good Evening',
    },
    'namePlaceholder' : 'Enter Name',
    'defaultCity' : 'Minsk',
    'weather' : {
      'wind' : {
        'title' : 'Wind speed',
        'units' : 'm/s'
      },
      'humidity' : {
        'title' : 'Humidity'
      },
      'error' : 'ERROR: the location not found!',
      'placeholder' : 'Enter City'
    }
  },
  'ru' : {
    'greeting' : {
      'night' : 'Доброй ночи',
      'morning' : 'Доброе утро',
      'afternoon' : 'Добрый день',
      'evening' : 'Добрый вечер',
    },
    'namePlaceholder' : 'Введите имя',
    'defaultCity' : 'Минск',
    'weather' : {
      'wind' : {
        'title' : 'Скорость ветра',
        'units' : 'м/с'
      },
      'humidity' : {
        'title' : 'Влажность'
      },
      'error' : 'ОШИБКА: локация не найдена!',
      'placeholder' : 'Введите город'
    }
  }
}

function setLoacalization(lang) {
  userLanguage = lang;
}

function updateLocaization() {
  city.value = localization[userLanguage]['defaultCity'];
  getWeather();
  updateMainContext();
  if (!greetingName.value) setNamePlaceholder();
  getQuotes();
}

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

  const userCity = localStorage.getItem('city');

  if (userCity) {
    if (userCity.trim()) city.value = userCity.trim();
  } else {
    city.value = localization[userLanguage]['defaultCity'];
  }
}

window.addEventListener('beforeunload', setUserSettings);
window.addEventListener('beforeunload', setLocalStorage);

window.addEventListener('load', getUserSettings);
window.addEventListener('load', getLocalStorage);


// ----------------date
const date = document.querySelector('.date');

function showDate() {
  const dateObj = new Date();
  const options = {month: 'long', weekday: 'long', day: 'numeric'};
  const currentDate = dateObj.toLocaleDateString(userLanguage, options);
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
  // greetingText.textContent = `Good ${timeOfDay},`;
  greetingText.textContent = `${localization[userLanguage]['greeting'][timeOfDay]},`;
}

//-----------------greeting name
const greetingName = document.querySelector('.greeting-container .name');

function setNamePlaceholder() {
  greetingName.setAttribute('placeholder', `[${localization[userLanguage]['namePlaceholder']}]`);
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
    city.setAttribute('placeholder', `[${localization[userLanguage]['weather']['placeholder']}]`);
    city.value = '';
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&lang=${userLanguage}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);

  try {
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${localization[userLanguage]['weather']['wind']['title']}: ${Math.round(data.wind.speed)} ${localization[userLanguage]['weather']['wind']['units']}`;
    humidity.textContent = `${localization[userLanguage]['weather']['humidity']['title']}: ${Math.round(data.main.humidity)}%`;
  } catch (error) {
    weatherIcon.className = 'weather-icon owf';
    weatherDescription.textContent = `${localization[userLanguage]['weather']['error']}`;
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
  const quotes = `assets/json/quotes_${userLanguage}.json`;

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


changeQuoteIco.addEventListener('click', getQuotes);

// ----------------setTimeout
function updateMainContext() {
  showDate();
  showTime()
  showGreeting();
  setTimeout(updateMainContext, 1000);
}

//----------------settings

function isEmptyObject(obj) {
  for (var property in obj) {
      if (obj.hasOwnProperty(property)) return false;
  }
  return true;
}

function toggleSlider(appName) {
  const checkbox = document.querySelector(`input[name="${appName}"]`);
  const slider = checkbox.parentElement;

  if (!checkbox.checked) {
    checkbox.checked = true;
    slider.classList.add('on');
  } else {
    checkbox.checked = false;
    slider.classList.remove('on');
  }
  console.log(slider);
}

function toggleApps(activeApps) {
  activeApps.forEach(app => {
    document.querySelector(`[data-app-name="${app}"]`).classList.remove('hide');
    toggleSlider(app);
  });
}

function toggleOption(optionValue) {
  const oldOption = document.querySelector(`[data-option="${optionValue}"]`).parentNode.querySelector('.active');
  const newOption = document.querySelector(`[data-option="${optionValue}"]`);
  console.log(oldOption);
  if (oldOption) oldOption.classList.remove('active');
  newOption.classList.add('active');
}

function getUserSettings() {
  const defaultSettings = {
    'language': 'en',
    'bgSource': 'github',
    'apps': ['time', 'date', 'greeting', 'quote', 'weather', 'player']
  };

  const userSettings = JSON.parse(localStorage.getItem('settings'));

  const state = isEmptyObject(userSettings) ? defaultSettings : userSettings;

  toggleApps(state.apps);
  toggleOption(state.language);
  toggleOption(state.bgSource);

  setLoacalization(state.language);
}

const settingsBtn = document.querySelector('.settings-icon');
const settingsContainer = document.querySelector('.settings-app');

const appsListSettingsContainer = document.querySelector('.apps-list');
const appsCheckboxArr = document.querySelectorAll(('.apps-list input[type="checkbox"]'));
const optionsArr = document.querySelectorAll(('.toggle-options'));

function toggleSettings() {
  settingsBtn.classList.toggle('settings-open');
  settingsContainer.classList.toggle('hide');
}

settingsBtn.addEventListener('click', toggleSettings);

function hideApp(appName) {
  const app = document.querySelector(`[data-app-name=${appName}]`);
  app.classList.toggle('hide');
}

appsListSettingsContainer.addEventListener('click', function(event) {
  const li = event.target.closest('li');
  if (!li || !appsListSettingsContainer.contains(li)) return;
  const checkbox = li.children[0];
  toggleSlider(checkbox.name);
  hideApp(checkbox.name);
})

function setUserSettings() {
  const userLang = document.querySelector('.custom-lang-toggle .active').getAttribute('data-option');
  const userBgSource = document.querySelector('.custom-bg-toggle .active').getAttribute('data-option');
  const state = {
    'language': userLang,
    'bgSource': userBgSource,
    'apps': []
  };
  appsCheckboxArr.forEach(checkbox => {
    if (checkbox.checked) {
      state.apps.push(checkbox.name);
    }
  });
  localStorage.setItem('settings', JSON.stringify(state));
}

body.addEventListener('click', (e) => {
  if (e.target.closest('.settings-app') || e.target.closest('.settings-icon')) return;
  if (!settingsContainer.classList.contains('hide')) {
    toggleSettings();
  }
});

optionsArr.forEach(options => {
  options.addEventListener('click', (e) => {
  const optionEl = e.target.closest('.toggle-option');
  if (!optionEl) return;
  if (optionEl.classList.contains('active')) return;
  toggleOption(optionEl.getAttribute('data-option'));

    if (optionEl.closest('.custom-lang-toggle')) {
      setLoacalization(optionEl.getAttribute('data-option'));
      updateLocaization();
    }
  })
})







function init() {
  document.querySelectorAll('.none').forEach(el => {
    el.classList.remove('none');
  });
  getWeather();
  updateMainContext();
  getQuotes();
}

window.addEventListener('load', init);



