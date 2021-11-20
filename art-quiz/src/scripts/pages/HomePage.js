export class HomePage {
  constructor(mainContainer, navigation) {
    this.main = mainContainer;
    this.content = `
      <section class="homepage">
      <span class="settings"></span>
      <img src="./assets/img/main-logo.png" alt="logo" class="home-logo" width="165" height="60">
        <div class="quiz-catrgories">
          <button class="catrgory artist-btn btn" data-quiz="artists">Artist quiz</button>
          <button class="catrgory pic-btn btn" data-quiz="pictures">Pictures quiz</button>
        </div>
      </section>`;

//todo: delete comments
      document.body.setAttribute('data-page', 'home');
      this.main.innerHTML = this.content;

      this.settingsBtn = this.main.querySelector('settings');
      this.categoryArtistBtn = this.main.querySelector('.artist-btn');
      this.categoryPicBtn = this.main.querySelector('.pic-btn');

      this.categoryArtistBtn.addEventListener('click', (e) => {navigation.goToCategories(this.getQuizTheme(e.target))});
      this.categoryPicBtn.addEventListener('click', (e) => {navigation.goToCategories(this.getQuizTheme(e.target))});
  }

  getQuizTheme(btn) {
    if (btn.tagName.toLowerCase() === 'button') return btn.getAttribute('data-quiz');
  }
}
