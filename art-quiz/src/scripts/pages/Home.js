export class Home {
  constructor(mainContainer) {
    this.main = mainContainer;
    this.content = `
      <div class="homescreen">
      <span class="settings"></span>
      <img src="./assets/img/main-logo.png" alt="logo" class="home-logo" width="165" height="60">
        <div class="quiz-catrgories">
          <button class="catrgory artist-btn btn">Artist quiz</button>
          <button class="catrgory pic-btn btn">Pictures quiz</button>
        </div>
      </div>`;
      this.main.innerHTML = this.content;
      this.categoryArtistBtn = this.main.querySelector('.artist-btn');
      this.categoryPicBtn = this.main.querySelector('.pic-btn');
  }
}
