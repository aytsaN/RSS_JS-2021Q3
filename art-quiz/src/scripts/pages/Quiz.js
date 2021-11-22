import { QuizHandler } from "../QuizHandler";

class Quiz {
  constructor(main, quizName, quizCategory, quizData, gameSettings, navigation) {
    this.main = main;
    this.quizName = quizName;
    this.quizCategory = quizCategory;
    this.quizData = quizData;
    this.gameSettings = gameSettings;
    this.navigation = navigation;

    this.currentQuestionNum = 0;

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

    this.closeQuiz = this.main.querySelector('.quiz-main .close-ico');
    this.closeQuiz.addEventListener('click', () => {navigation.goToCategories(this.quizName)});

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

  static getFourAnswers(currentQuestionData, quizData, currentQuestionNum, targetProp) {
    let answers = [];
    let copyArr = [...quizData];
    copyArr.splice(currentQuestionNum, 1);
    copyArr = Quiz.shuffle(copyArr);
    copyArr.forEach(el => {
      answers.push(el[targetProp]);
    })
    answers = new Set([...answers]);
    answers = [...answers];
    answers.length = 4;
    answers[0] = currentQuestionData[targetProp];
    answers = Quiz.shuffle(answers);
    return answers;
  }

  static showQCard(card, correctAnswer, currentQuestionData, navigation) {
    new QuizHandler(card, currentQuestionData, correctAnswer, navigation);
    card.classList.add('show');
  }
}

class QuizArtists extends Quiz {
  constructor(...args) {
    super(...args);
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

  static prepareAnswers(currentQuestionData, quizData, currentQuestionNum) {
    let answers = Quiz.getFourAnswers(currentQuestionData, quizData, currentQuestionNum, 'author');
    let answerElement = '';

    answers.forEach(el => {
      const button = `<button class="answers-btn btn" data-answer="${el}">${el}</button>`;
      answerElement += button;
    });

    return answerElement;
  }

  startQuiz() {
    const answers = QuizArtists.prepareAnswers(this.currentQuestionData, this.quizData, this.currentQuestionNum);
    QuizArtists.renderAnswers(this.qustionInner, answers, this.currentQuestionData);
    QuizArtists.showQCard(this.qustionInner, this.correctAnswer,  this.currentQuestionData, this.navigation);
  }
}

class QuizPictures extends Quiz {
  constructor(...args) {
    super(...args);
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
