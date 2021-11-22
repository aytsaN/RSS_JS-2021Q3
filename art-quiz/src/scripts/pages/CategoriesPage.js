import { ImagesData } from "../ImagesData";

class CategoriesPage {
  constructor(mainContainer, quiz, quizScore, categoriesName, navigation) {
    this.main = mainContainer;
    this.navigation = navigation;
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
    this.quizCategoriesData = {};
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

    for (let i = 0, count = 0; i < this.imgQuizData.length; i += this.questionsNum, count++) {
      this.quizCategoriesData[this.categoriesName[count]] = [];
      const array = this.quizCategoriesData[this.categoriesName[count]];
      array.push(this.imgQuizData.slice(i, i + this.questionsNum));
    }

    this.categoriesName.forEach((category) => {
      const categoryScore = this.quizScore[category];
      let correctAnswersCount = categoryScore.length ?
        CategoriesPage.getCategoryScore(categoryScore) :
        null;

      const scoreElement = `<span class="score">${correctAnswersCount}/${this.questionsNum}</span>`;
      const imgNum = this.quizCategoriesData[category][0][1]['imageNum'];
      const imgPath = `./assets/quiz-image-data/square/${imgNum}.jpg`;
      const categoryDiv = `<div class="categories-item ${correctAnswersCount === null ? '' : 'passed'}" data-category="${category}">
        <p class="category-title">${category} ${correctAnswersCount !== null ? scoreElement : ''}</p>
        <div class="category-img">
          <img src="${imgPath}" alt="category">
        </div>
      </div>`;

      template += categoryDiv;
    })

    categoriesWrapper.innerHTML = template;
    categoriesWrapper.addEventListener('click', (e) => {
      const item = e.target.closest('.categories-item');
      if (item) {
        const category = item.getAttribute('data-category');
        this.navigation.navMenu.hideNavMenu(this.navigation.navMenu, this.navigation.goToQuiz.bind(this.navigation, this.quiz, category, this.quizCategoriesData[category][0]))
        // this.navigation.goToQuiz(this.quiz, category, this.quizCategoriesData[category][0]);
      }
    });
  }
}

class ArtistsCategoriesPage extends CategoriesPage {
  constructor(...args) {
    super(...args);
    this.startImgNum = 0;
    this.endImgNum = 120;
    this.renderCategories(this.startImgNum, this.endImgNum);
  }
}

class PicturesCategoriesPage extends CategoriesPage {
  constructor(...args) {
    super(...args);
    this.startImgNum = 120;
    this.endImgNum = 240;
    this.renderCategories(this.startImgNum, this.endImgNum);
  }
}

export { ArtistsCategoriesPage, PicturesCategoriesPage };
