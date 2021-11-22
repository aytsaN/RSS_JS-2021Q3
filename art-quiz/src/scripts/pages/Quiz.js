class Quiz {
  constructor(main, quizName, quizCategory, quizData, gameSettings) {
    this.main = main;
    this.quizName = quizName;
    this.quizCategory = quizCategory;
    this.quizData = quizData;
    this.gameSettings = gameSettings;

    this.currentQuestionNum = 0;

    //console.log('44', quizData, this.quizName, this.quizCategory,this.quizData, this.gameSettings);

    document.body.setAttribute('data-page', 'quiz');
    this.content = `<section class="quiz-main">
      <div class="control">
        <span class="close-ico">&#10006;</span>
        <progress class="time-progress" max="100" value="70"></progress>
        <div class="timer">00:08</div>
      </div>
      <div class="qustion-inner"></div>
    </section>`;
    this.main.innerHTML = this.content;

    this.qustionInner = this.main.querySelector('.qustion-inner');
  }

  get currentQuestionData() {
    return this.quizData[this.currentQuestionNum];
  }

  set currentQuestionData(value) {}

  get correctAnswer() {}
  set correctAnswer(value) {}

  static renderQuestion(element) {}

  static shuffle(array) {
    const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
    return shuffledArray;
  }
}

class QuizArtists extends Quiz {
  constructor(...args) {
    super(...args);
    console.log('1',this.quizName, this.quizCategory,this.quizData, this.gameSettings, this.currentQuestionData);
  }

  get correctAnswer() {
    return this.currentQuestionData.author;
  }

  static renderAnswers(qustionInner, answers, currentQuestionData) {
    const questionElement = `<p class="question-text">Who is the author of this picture?</p>
    <img src="./assets/quiz-image-data/square/${currentQuestionData.imageNum}.jpg" alt="quiz-img" width="100%">
    <div class="current-score">
      <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
    </div>
    <div class="answers">${answers}</div>`;

    qustionInner.innerHTML = questionElement;
  }

  static getFourAnswers(currentQuestionData, quizData, currentQuestionNum) {
    console.log(quizData);
    let answers = [];
    let tmpArr = quizData;
    tmpArr.splice(currentQuestionNum, 1);
    tmpArr = Quiz.shuffle(quizData);
    tmpArr.forEach(el => {
      answers.push(el.author);
    })
    answers = new Set([...answers]);
    answers = [...answers];
    answers.length = 4;
    answers[0] = currentQuestionData.author;
    answers = Quiz.shuffle(answers);
    return answers;
  }

  static prepareAnswers(currentQuestionData, quizData, currentQuestionNum) {
    let answers = QuizArtists.getFourAnswers(currentQuestionData, quizData, currentQuestionNum);
    let answerElement = '';
    console.log(currentQuestionData);

    console.log(answers);

    answers.forEach(el => {
      const button = `<button class="answers-btn btn" data-answer="${el}">${el}</button>`;
      answerElement += button;
    });

    return answerElement;
  }

  startQuiz() {
    console.log(this.quizData);
    const answers = QuizArtists.prepareAnswers(this.currentQuestionData, this.quizData, this.currentQuestionNum);
    QuizArtists.renderAnswers(this.qustionInner, answers, this.currentQuestionData);
  }
}

class QuizPictures extends Quiz {
  constructor(...args) {
    super(...args);
    console.log('22',this.quizName, this.quizCategory,this.quizData, this.gameSettings);
  }

  get correctAnswer() {
    return this.currentQuestionData.name;
  }

  static renderQuestion() {

  }

  startQuiz() {

  }
}

export { QuizArtists, QuizPictures };
