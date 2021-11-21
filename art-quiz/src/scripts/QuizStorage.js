export class QuizStorage {
  constructor(categories) {
    this.categories = categories;
    this.score = QuizStorage.initScore({'artists': {},'pictures': {}}, this.categories);
    this.settings = {
      isTimer: true,
      timeToAnswer: 10,
      isMute: false,
      volume: 10
    };
  }

  static getFromStorage(item) {
    const data = localStorage.getItem(item)
    return JSON.parse(data);
  }

  static initScore(score, categories) {
    categories.forEach(categoryName => {
      score['artists'][categoryName] = [];
      score['pictures'][categoryName] = [];
    });
    return score;
  }

  getLocalStorage() {
    if (localStorage.getItem('score')) {
      this.score = QuizStorage.getFromStorage('score');
    }
    if (!this.score) QuizStorage.initScore({'artists': {},'pictures': {}}, this.categories);

    if (localStorage.getItem('settings')) {
      this.settings = QuizStorage.getFromStorage('settings');
    }
  }

  setLocalStorage() {
    const dataScore = JSON.stringify(this.score);
    const dataSettings = JSON.stringify(this.settings);
    localStorage.setItem('score', dataScore);
    localStorage.setItem('settings', dataSettings);
  }
}
