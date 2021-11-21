export class NavigationMenu {
  constructor(main, navigation) {
    this.main = main;
    this.navigarion = navigation
    this.element = document.createElement('nav');
    this.element.classList.add('navigation');
    this.element.innerHTML = `<div class="nav home"><span class="icon"></span>Home</div>
      <div class="nav categories active"><span class="icon"></span>Categories</div>
      <div class="nav settings"><span class="icon"></span>Settings</div>`;
    this.main.after(this.element);

    console.log(this.navigarion)
    this.homeBtn = this.element.querySelector('.home');
    this.homeBtn.addEventListener('click', () => this.navigarion.goToHome());
  }
}
