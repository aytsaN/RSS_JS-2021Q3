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
// navigation.appBg.classList.add('home-bg');
//       document.body.setAttribute('data-page', 'home');
//       this.main.innerHTML = this.content;

//       this.settingsBtn = this.main.querySelector('settings');
//       this.categoryArtistBtn = this.main.querySelector('.artist-btn');
//       this.categoryPicBtn = this.main.querySelector('.pic-btn');

      this.categoryArtistBtn.addEventListener('click', (e) => {
        const tagert = e.target;
        const theme = this.getQuizTheme(tagert);
        navigation.appBg.classList.remove('home-bg');
        navigation.goToCategories(theme);

      });
      this.categoryPicBtn.addEventListener('click', (e) => {
        const tagert = e.target;
        const theme = this.getQuizTheme(tagert);
        navigation.appBg.classList.remove('home-bg');
        navigation.goToCategories(theme);
      });
  }

  getQuizTheme(btn) {
    if (btn.tagName.toLowerCase() === 'button') return btn.getAttribute('data-quiz');
  }
}
