export class QuizHandler {
  constructor(card, correctAnswerData, correctAnswer, navigation, quiz) {
    this.card = card;
    this.navigation = navigation;
    this.quiz = quiz;
    this.correctAnswer = correctAnswer;
    this.correctAnswerData = correctAnswerData;
    this.answersWrapper = this.card.querySelector('.answers');
    this.answersWrapper.addEventListener('click', (e) => {
      const item = e.target.closest('[data-answer]');
      if (item) {
        const userChoice = item.getAttribute('data-answer');
        QuizHandler.processUserResopnce(userChoice, this.correctAnswer, this.correctAnswerData, navigation, quiz);
      }
    });
  }

  static responseReceived = false;

  static processUserResopnce(userChoice, correctAnswer, correctAnswerData, navigation, quiz) {
    QuizHandler.responseReceived = true;
    let answerStatus;
    if (!userChoice);
    if (userChoice === correctAnswer) {
      answerStatus = 'correct';
    } else {
      answerStatus = 'wrong';
    }
    QuizHandler.renderCorrectAnswer(answerStatus, correctAnswerData, navigation, quiz);
  }

  static renderCorrectAnswer(answerStatus, correctAnswerData, navigation, quiz) {
    const imgNum = correctAnswerData.imageNum;
    const name = correctAnswerData.name;
    const author = correctAnswerData.author;
    const year = correctAnswerData.year;

    let statusEl = (answerStatus === 'correct') ?
      `<div class="status ${answerStatus} show">&#10004;</div>` :
      `<div class="status ${answerStatus} show">&#10006;</div>`;

    const card = document.createElement('div');
    card.classList.add('card-answer', 'popup', 'show');


    this.element = `<div class="img-wrapper">
        <img src="./assets/quiz-image-data/square/${imgNum}.jpg" alt="pic" width="95%">
        ${statusEl}
      </div>
      <p class="pic-name">${name}</p>
      <p class="pic-info">${author}, ${year}</p>
      <button class="next-btn btn">Next</button>`;

    card.innerHTML = this.element;
    navigation.addPopupBg();
    navigation.main.append(card);
    navigation.audio.playSound(answerStatus);


    const btnNext = card.querySelector('.next-btn');
    QuizHandler._waitAnimation(card, () => {card.classList.remove('show')});
    btnNext.addEventListener('click', () => {
      card.classList.add('hide');
      QuizHandler._waitAnimation(card, () => {
        card.remove();
        navigation.removePopupBg();
        quiz.proceedNext(answerStatus, quiz);
      })
    });
  }

  static _waitAnimation(el, func) {
    Promise.all(
      el.getAnimations().map(
        function(animation) {
          return animation.finished;
        }
      )
    ).then(
      function() {
        if (func) func();
      }
    );
  }

  static _showEndPopup(correctNum, result, navigation, quizName) {
    navigation.addPopupBg();
    const card = document.createElement('div');
    card.classList.add('end-card', 'popup', 'show');

    this.element = `<div class="end-img"></div>
      <p class="end-text">Congratulations!</p>
      <p class="score">${correctNum}/10</p>
      <div class="end-buttons">
        <button class="home-btn btn">Home</button>
        <button class="next-btn btn">Next Quiz</button>
      </div>`;

    card.innerHTML = this.element;
    navigation.addPopupBg();
    navigation.main.append(card);
    navigation.audio.playSound('end');
    QuizHandler._waitAnimation(card, () => {card.classList.remove('show')});

    const btnHome = card.querySelector('.home-btn');
    btnHome.addEventListener('click', () => {
      card.classList.add('hide');
      QuizHandler._waitAnimation(card, () => {
        card.remove();
        navigation.removePopupBg();
        navigation.goToHome();
      })
    });

    const btnCategories = card.querySelector('.next-btn');
    btnCategories.addEventListener('click', () => {
      card.classList.add('hide');
      QuizHandler._waitAnimation(card, () => {
        card.remove();
        navigation.removePopupBg();
        navigation.goToCategories(quizName);
      })
    });
  }

  createTimer(time, main) {
    const timerEl = main.querySelector('.timer');
    const parms = [null, this.correctAnswer, this.correctAnswerData, this.navigation, this.quiz];
    QuizHandler.responseReceived = false;
    QuizHandler._updateTimer(time, timerEl, parms);
  }

  static _updateTimer(time, timerEl, parms) {
    if (time > 0 && !QuizHandler.responseReceived) {
      timerEl.textContent = `00:${time > 9 ? '' : '0'}${time}`;
      setTimeout(() => QuizHandler._updateTimer(time - 1, timerEl, parms), 1000);
    } else if (time === 0) {
      timerEl.textContent = `00:00`;
      QuizHandler.processUserResopnce(...parms);
    }
  }
}
