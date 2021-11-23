export class Settings {
  constructor(mainContainer, storage) {
    this.settings = storage.settings;

    const settingsWindow = document.createElement('div');
    settingsWindow.classList.add('settings-window', 'show');
    this.element = `<header class="settings-hdr hdr">
        <span class="back"><</span>
        <h3 class="title">Settings</h3>
      </header>
      <div class="volume settings-section">
        <p class="title">Volume</p>
        <input type="range" class="volume-range" min="0" max="1" value="${storage.settings.volume}" step="0.1">
      </div>
      <div class="time settings-section">
        <p class="title">Time game</p>
        <div class="toggle">
          <span class="on" data-time="true">ON</span> / <span class="off" data-time="false">OFF</span></div>
      </div>
      <div class="timer settings-section">
        <p class="title">Time to answer</p>
        <div class="input-time-container">
          <button type="button" class="decrease btn">−</button>
          <input type="number" min="5" max="30" value="${storage.settings.timeToAnswer}" step="5" class="time-number">
          <button type="button" class="increase btn">+</button>
        </div>
      </div>`;

    settingsWindow.innerHTML = this.element;
    mainContainer.after(settingsWindow);

    this.btnBack = settingsWindow.querySelector('.back');
    this.btnBack.addEventListener('click', () => {settingsWindow.remove()});

    this.volumeInput = settingsWindow.querySelector('.volume-range');
    this.volumeInput.value = storage.settings.volume;
    this.volumeInput.addEventListener('input', (e) => Settings._updateVolume(e.target, storage));

    this.timeToggle = settingsWindow.querySelector('.toggle');
    const isTimer = storage.settings.isTimer;
    const activeToggle = this.timeToggle.querySelector(`[data-time="${isTimer}"]`);
    activeToggle.classList.add('active');
    this.timeToggle.addEventListener('click', (e) => Settings._toggleTime(e.target, storage));

    this.timeInput = settingsWindow.querySelector('.time-number');
    this.timeInput.addEventListener('change', () => {
      if (this.timeInput.value % 5 === 0 && this.timeInput.value < 31 && this.timeInput.value > 4) {
        storage.settings.timeToAnswer = this.timeInput.value;
      } else {
        this.timeInput.value = storage.settings.timeToAnswer;
      }
    });


    this.btnDecrease = settingsWindow.querySelector('.btn.decrease');
    this.btnDecrease.addEventListener('click', () => {
      if (this.timeInput.value > 9) {
        this.timeInput.value -= 5;
        storage.settings.timeToAnswer = this.timeInput.value;
      }
    });

    this.btnIncrease = settingsWindow.querySelector('.btn.increase');
    this.btnIncrease.addEventListener('click', () => {
      if (this.timeInput.value < 26)
        this.timeInput.value = +this.timeInput.value + 5;
        storage.settings.timeToAnswer = this.timeInput.value;
    });


  }

  static _updateVolume(valueInput, storage) {
    storage.settings.volume = valueInput.value;
  }

  static _toggleTime(toggleEl, storage) {
    if (!toggleEl.closest(`[data-time]`)) return;
    if (toggleEl.classList.contains('active')) return;
    const parent = toggleEl.closest('.toggle');
    const oldValue = parent.querySelector('span.active');
    oldValue.classList.remove('active');
    toggleEl.classList.add('active');
    const newValue = toggleEl.getAttribute('data-time')
    storage.settings.isTimer = newValue;
  }
}
