class Quiz {
  constructor(main, quizName, quizCategory, quizData, gameSettings) {
    this.main = main;
    this.quizName = quizName;
    this.quizCategory = quizCategory;
    this.quizData = quizData;
    this.gameSettings = gameSettings;
    //console.log('44', quizData, this.quizName, this.quizCategory,this.quizData, this.gameSettings);

  }


}

class QuizArtists extends Quiz {
  constructor(...args) {
    super(...args);
    console.log('1',this.quizName, this.quizCategory,this.quizData, this.gameSettings);
  }

  startQuiz() {

  }
}

class QuizPictures extends Quiz {
  constructor(...args) {
    super(...args);
    console.log('22',this.quizName, this.quizCategory,this.quizData, this.gameSettings);
  }

  startQuiz() {

  }
}

export { QuizArtists, QuizPictures };
