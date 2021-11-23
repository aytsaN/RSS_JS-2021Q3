export class AudioHandler {
  constructor(storage) {
    this.storage = storage;
  }

  playSound(status) {
    const volume = this.storage.settings.volume;
    const url = `./assets/audio/${status}.mp3`;
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play();
  }
}
