import { QuizHandler } from "../QuizHandler";

class Quiz {
  constructor(main, quizName, quizCategory, quizData, gameSettings, navigation) {
    this.main = main;
    this.quizName = quizName;
    this.quizCategory = quizCategory;
    this.quizData = quizData;
    this.gameSettings = gameSettings;
    this.navigation = navigation;
    this.isTimer = this.navigation.storage.settings.isTimer;
    this.timeToAnswer = navigation.storage.settings.timeToAnswer;

    this.currentQuestionNum = 0;
    this.lastQuestionNum = 9;
    this.result = [];


    const timerElement = `<progress class="time-progress" max="100" value="70"></progress><div class="timer">00:${this.timeToAnswer}</div>`;
    document.body.setAttribute('data-page', 'quiz');
    this.content = `<section class="quiz-main">
      <div class="control">
        <span class="close-ico">&#10006;</span>
        ${this.isTimer == 'true' ? timerElement : ''}
      </div>
      <div class="qustion-inner"></div>
    </section>`;
    this.main.innerHTML = this.content;

    this.closeQuiz = this.main.querySelector('.quiz-main .close-ico');
    this.closeQuiz.addEventListener('click', () => {
      QuizHandler.responseReceived = true;
      navigation.goToCategories(this.quizName)
    });
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

  static _showQCard(card, correctAnswer, currentQuestionData, navigation, quiz) {
    const handler = new QuizHandler(card, currentQuestionData, correctAnswer, navigation, quiz);
    card.classList.add('show');
    QuizHandler._waitAnimation(card, () => {
      if (quiz.isTimer == 'true')
      handler.createTimer(quiz.timeToAnswer, quiz.main, quiz);
    });
  }

  static _markScore(results, div) {
    const scoreDots = div.querySelectorAll('.current-score span');
    results.forEach((value, index) => {
      scoreDots[index].classList.add(value);
    });
  }

  static _proceedToFinish(result, navigation, quizName, quizCategoryName) {
    let correctNum = 0;
    result.forEach(value => {
      if (value == 'correct') correctNum++;
    })
    QuizHandler._showEndPopup(correctNum, result, navigation, quizName);
    navigation.storage.updateLocalScore(result, quizName, quizCategoryName);
  }

  proceedNext(answer, quiz) {
    const quizConstructor = quiz.constructor;
    this.result.push(answer);
    if (this.currentQuestionNum === this.lastQuestionNum) {
      Quiz._proceedToFinish(this.result, this.navigation, this.quizName, this.quizCategory);
    } else {
      this.qustionInner.classList.add('hide');
      this.currentQuestionNum++;
      const answers = quizConstructor._prepareAnswers(this.currentQuestionData, this.quizData, this.currentQuestionNum);
      QuizHandler._waitAnimation(this.qustionInner, () => {
        this.qustionInner.classList.remove('hide');
        quizConstructor._renderAnswers(this.qustionInner, answers, this.currentQuestionData);
        Quiz._markScore(this.result, this.qustionInner);
        Quiz._showQCard(this.qustionInner, this.correctAnswer,  this.currentQuestionData, this.navigation, this);
      });
    }
  }
}

class QuizArtists extends Quiz {
  constructor(...args) {
    super(...args);
  }

  get correctAnswer() {
    return this.currentQuestionData.author;
  }

  static _renderAnswers(qustionInner, answers, currentQuestionData) {
    const questionElement = `<p class="question-text">Who is the author of this picture?</p>
    <img src="./assets/quiz-image-data/square/${currentQuestionData.imageNum}.jpg" alt="quiz-img" width="100%">
    <div class="current-score">
      <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
    </div>
    <div class="answers">${answers}</div>`;

    qustionInner.innerHTML = questionElement;
  }

  static _prepareAnswers(currentQuestionData, quizData, currentQuestionNum) {
    let answers = Quiz.getFourAnswers(currentQuestionData, quizData, currentQuestionNum, 'author');
    let answerElement = '';

    answers.forEach(el => {
      const button = `<button class="answers-btn btn" data-answer="${el}">${el}</button>`;
      answerElement += button;
    });

    return answerElement;
  }

  startQuiz() {
    const answers = QuizArtists._prepareAnswers(this.currentQuestionData, this.quizData, this.currentQuestionNum);
    QuizArtists._renderAnswers(this.qustionInner, answers, this.currentQuestionData);
    Quiz._showQCard(this.qustionInner, this.correctAnswer,  this.currentQuestionData, this.navigation, this);
  }
}

class QuizPictures extends Quiz {
  constructor(...args) {
    super(...args);
  }

  get correctAnswer() {
    return this.currentQuestionData.imageNum;
  }

  static renderQuestion() {
  }

  static _renderAnswers(qustionInner, answers, currentQuestionData) {
    const questionElement = `<p class="question-text">Which is ${currentQuestionData.author} picture?</p>
    <div class="answers">${answers}</div>
    <div class="current-score">
      <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
    </div>`;

    qustionInner.innerHTML = questionElement;
  }

  static _prepareAnswers(currentQuestionData, quizData, currentQuestionNum) {
    let answers = Quiz.getFourAnswers(currentQuestionData, quizData, currentQuestionNum, 'imageNum');
    let answerElement = '';

    answers.forEach(num => {
      const img = `<img src="../../assets/quiz-image-data/square/${num}.jpg" class="answers-img" data-answer="${num}"></img>`;
      answerElement += img;
    });

    return answerElement;
  }

  startQuiz() {
    const answers = QuizPictures._prepareAnswers(this.currentQuestionData, this.quizData, this.currentQuestionNum);
    QuizPictures._renderAnswers(this.qustionInner, answers, this.currentQuestionData);
    Quiz._showQCard(this.qustionInner, this.correctAnswer,  this.currentQuestionData, this.navigation, this);
  }
}

export { QuizArtists, QuizPictures };
