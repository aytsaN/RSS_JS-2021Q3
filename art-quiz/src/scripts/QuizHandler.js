export class QuizHandler {
  constructor(card, correctAnswerData, correctAnswer, navigation) {
    this.navigation = navigation;
    this.card = card;
    this.correctAnswer = correctAnswer;
    this.correctAnswerData = correctAnswerData;

    this.answersWrapper = this.card.querySelector('.answers');
    console.log(this.correctAnswer)
    this.answersWrapper.addEventListener('click', (e) => {
      const item = e.target.closest('[data-answer]');
      if (item) {
        const userChoice = item.getAttribute('data-answer');

        QuizHandler.processUserResopnce(userChoice, this.correctAnswer, this.correctAnswerData , this.navigation);
      }
    });
  }

  static processUserResopnce(userChoice, correctAnswer, correctAnswerData, navigation) {
    let answerStatus;
    console.log(correctAnswerData);
    if (!userChoice);
    if (userChoice === correctAnswer) {
      answerStatus = 'correct';
    } else {
      answerStatus = 'wrong';
    }
    QuizHandler.renderCorrectAnswer(answerStatus, correctAnswerData, navigation);
  }

  static renderCorrectAnswer(answerStatus, correctAnswerData, navigation) {
    console.log(correctAnswerData);
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
  }
}
