export class ScorePage {
  constructor(quizName, categoryName, answers, categoryData, main, navigation) {
    this.main = main;
    this.navigation = navigation;
    this.quizName = quizName;
    this.categoryName = categoryName;
    this.answers = answers;
    this.categoryData = categoryData;

    let cards = '';
    this.categoryData.forEach((item, index)  => {
      const element = `<div class="card score-item ${this.answers[index]}">
        <img src="./assets/quiz-image-data/square/${item.imageNum}.jpg" alt="score" class="card__face card__face--front">
        <div class="card__face card__face--back">
          <div class="name">${item.name}</div>
          <div class="author-year">${item.author}, ${item.year}</div>
        </div>
      </div>`;
      cards += element;
    });

    this.content = `<section class="score-main">
      <header class="score-hdr hdr">
        <span class="back"><</span>
        <h3 class="title">Portrait category</h3>
      </header>
      <div class="score-tiles tiles">
        ${cards}
      </div>
    </section>`;

    this.main.innerHTML = this.content;

    this.scoreContainer = this.main.querySelector('.score-tiles');
    this.scoreContainer.addEventListener('click', (e) => {

      const target = e.target.closest('.score-item')
      console.log('here', e.target.closest('.score-item'), target);
      if (target) {
        target.classList.toggle('is-flipped');
      }
    });

    this.btnBack = this.main.querySelector('.back');
    this.btnBack.addEventListener('click', () => {navigation.goToCategories(quizName)});
  }
}
