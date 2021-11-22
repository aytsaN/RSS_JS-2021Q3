import { NavigationMenu } from "./elements/NavigationMenu";
import { HomePage } from "./pages/HomePage";
import {
  ArtistsCategoriesPage,
  PicturesCategoriesPage
} from "./pages/CategoriesPage";
import {
  QuizArtists,
  QuizPictures
} from './pages/Quiz';

export class Navigation {
  constructor(main, storage, categoriesName) {
    this.main = main;
    this.storage = storage;
    this.categoriesName = categoriesName;
    this.appBg = document.querySelector('.app-bg');
    this.isArtistsQuiz = 'artists';
    this.isPicturesQuiz = 'pictures';
  }

  goToCategories(quiz) {
    let categoriesPage;
    if (quiz === this.isArtistsQuiz) {
      categoriesPage = new ArtistsCategoriesPage(this.main, quiz, this.storage.score[quiz], this.categoriesName, this);
    } else if (quiz === this.isPicturesQuiz) {
      categoriesPage = new PicturesCategoriesPage(this.main, quiz, this.storage.score[quiz], this.categoriesName, this);
    }

    const navMenu = new NavigationMenu(this.main, this);
  }

  goToHome() {
    new HomePage(this.main, this);
  }

  startQuiz(quizName, category, quizData) {
    let quiz;
    if (quizName === this.isArtistsQuiz) {
      quiz = new QuizArtists(this.main, quizName, category, quizData, this.storage.settings);
    } else if (quizName === this.isPicturesQuiz) {
      quiz = new QuizPictures(this.main, quizName, category, quizData, this.storage.settings);
    }
    quiz.startQuiz();
  }
}
