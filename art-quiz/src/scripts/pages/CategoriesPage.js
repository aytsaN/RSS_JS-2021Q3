import { ImagesData } from "../ImagesData";

class CategoriesPage {
  constructor(mainContainer, quiz, quizScore, categoriesName) {
    this.main = mainContainer;
    this.quiz = quiz;
    this.quizScore = quizScore;
    this.categoriesName = categoriesName;
    this.content = `<section class="categories-main">
      <img src="./assets/img/theme-logo.png" alt="logo" class="theme-logo" width="170" height="65">
      <h2 class="page-title">Categories</h2>
      <div class="categories-wrapper"></div>
    </section>`;

    document.body.setAttribute('data-page', 'categories');
    this.main.innerHTML = this.content;

    this.imgQuizData = [];
    this.quizCategoriesData = [];
    this.questionsNum = 10;
  }

  static getCategoryScore(answers) {
    const counts = {};
    answers.forEach((answer) => {
      counts[answer] = (counts[answer] || 0) + 1;
    });
    return counts.correct;
  }

  async renderCategories(startImgNum, endImgNum) {
    const categoriesWrapper = this.main.querySelector('.categories-wrapper');
    let template = '';
    const imagesData = new ImagesData(startImgNum, endImgNum);
    this.imgQuizData = await imagesData.getQuizData();

    for (let i = 0; i < this.imgQuizData.length; i += this.questionsNum) {
      this.quizCategoriesData.push(this.imgQuizData.slice(i, i + this.questionsNum));
    }

    this.categoriesName.forEach((category, index) => {
      const categoryScore = this.quizScore[category];
      let correctAnswersCount = categoryScore.length ?
        CategoriesPage.getCategoryScore(categoryScore) :
        null;

      const scoreElement = `<span class="score">${correctAnswersCount}/${this.questionsNum}</span>`;
      const imgNum = this.quizCategoriesData[index][1]['imageNum'];
      const imgPath = `./assets/quiz-image-data/square/${imgNum}.jpg`;
      const categoryDiv = `<div class="categories-item ${correctAnswersCount === null ? '' : 'passed'}">
        <p class="category-title">${category} ${correctAnswersCount !== null ? scoreElement : ''}</p>
        <div class="category-img">
          <img src="${imgPath}" alt="category">
        </div>
      </div>`;

      template += categoryDiv;
    })

    categoriesWrapper.innerHTML = template;
    console.log('from cat', this.quizScore, this.quizCategoriesData);
  }
}

class ArtistsCategoriesPage extends CategoriesPage{
  constructor(mainContainer, quiz, quizScore, categoriesName) {
    super(mainContainer, quiz, quizScore, categoriesName);
    this.startImgNum = 0;
    this.endImgNum = 120;
    this.renderCategories(this.startImgNum, this.endImgNum);
  }
}

class PicturesCategoriesPage extends CategoriesPage{
  constructor(mainContainer, quiz, quizScore, categoriesName) {
    super(mainContainer, quiz, quizScore, categoriesName);
    this.startImgNum = 120;
    this.endImgNum = 240;
    this.renderCategories(this.startImgNum, this.endImgNum);
  }
}

export { ArtistsCategoriesPage, PicturesCategoriesPage };
