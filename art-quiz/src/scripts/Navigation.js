import { NavigationMenu } from "./elements/NavigationMenu";
import { HomePage } from "./pages/HomePage";
import {
  ArtistsCategoriesPage,
  PicturesCategoriesPage
} from "./pages/CategoriesPage";

export class Navigation {
  constructor(main, storage, categoriesName) {
    this.main = main;
    this.storage = storage;
    this.categoriesName = categoriesName;
  }

  goToCategories(quiz) {
    if (quiz === 'artists') {
      const categoriesPage = new ArtistsCategoriesPage(this.main, quiz, this.storage.score[quiz], this.categoriesName);
    } else if (quiz === 'pictures') {
      const categoriesPage = new PicturesCategoriesPage(this.main, quiz, this.storage.score[quiz], this.categoriesName);
    }

    const navMenu = new NavigationMenu(this.main, this);
  }

  goToHome() {
    console.log(this.main);
    const homePage = new HomePage(this.main, this);
  }
}
