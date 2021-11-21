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
    this.appBg = document.querySelector('.app-bg');
    
    // this.isHomePage = document.body.getAttribute('data-bage') === 'home' ? true : false;
  }

  goToCategories(quiz) {
    // if (document.body.getAttribute('data-page') === 'home') {

    //   // this.appBg.classList.remove('home-bg');
    //   this.appBg.style.opacity = 0;
    // }

    if (quiz === 'artists') {
      const categoriesPage = new ArtistsCategoriesPage(this.main, quiz, this.storage.score[quiz], this.categoriesName, this);
    } else if (quiz === 'pictures') {
      const categoriesPage = new PicturesCategoriesPage(this.main, quiz, this.storage.score[quiz], this.categoriesName, this);
    }

    const navMenu = new NavigationMenu(this.main, this);
  }

  goToHome(navMenu) {
    navMenu.remove();
    this.appBg.classList.add('home-bg');
    const homePage = new HomePage(this.main, this);
  }
}
