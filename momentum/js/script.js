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
  const timeOfDayArr = ['Morning', 'Afternoon ', 'Evening', 'Night'];
  const date = new Date();
  const hours = date.getHours();
  const result = timeOfDayArr[Math.trunc(hours / 6) - 1];
  return result;
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  greetingText.textContent = `Good ${timeOfDay}`;
}

// ----------------setTimeout
function updateMainContext() {
  showDate();
  showTime()
  showGreeting();
  setTimeout(updateMainContext, 1000);
}

updateMainContext();
