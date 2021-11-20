import {
  ArtistsCategoriesPage,
  PicturesCategoriesPage
} from "./pages/CategoriesPage";

export class Navigation {
  constructor(main, storage, categoriesName) {
    this.main = main;
    this.storage = storage;
    this.categoriesName = categoriesName;
    this.isHomePage = this.main.classList.contains('home-page');
  }

  goToCategories(quiz) {
    if (this.isHomePage) {
      this.main.classList.remove('home-page');
    }

    if (quiz === 'artists') {
      const categoriesPage = new ArtistsCategoriesPage(this.main, quiz, this.storage.score[quiz], this.categoriesName);
    } else if (quiz === 'pictures') {
      const categoriesPage = new PicturesCategoriesPage(this.main, quiz, this.storage.score[quiz], this.categoriesName);
    }

    console.log(this.storage.score[quiz]);
  }
}
