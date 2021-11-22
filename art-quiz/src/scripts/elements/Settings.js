export class Settings {
  constructor(mainContainer, storage) {
    this.settings = storage.settings;

    const settingsWindow = document.createElement('div');
    settingsWindow.classList.add('settings-window', 'show');
    this.element = `<header class="settings-hdr">
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
          <span class="on active">ON</span> / <span class="off">OFF</span></div>
      </div>
      <div class="timer settings-section">
        <p class="title">Time to answer</p>
        <div class="input-time-container">
          <button type="button" class="decrease btn">−</button>
          <input type="number" min="5" max="30" value="10" step="5" class="time-number">
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
  }

  static _updateVolume(valueInput, storage) {
    storage.settings.volume = valueInput.value;
  }
}
