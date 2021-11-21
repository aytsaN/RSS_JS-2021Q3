export class NavigationMenu {
  constructor(main, navigation) {
    this.main = main;
    this.navigation = navigation
    this.element = document.createElement('nav');
    this.element.classList.add('navigation');
    this.element.classList.add('show');
    this.element.innerHTML = `<div class="nav home"><span class="icon"></span>Home</div>
      <div class="nav categories active"><span class="icon"></span>Categories</div>
      <div class="nav settings"><span class="icon"></span>Settings</div>`;
    this.main.after(this.element);

    this.homeBtn = this.element.querySelector('.home');
    this.homeBtn.addEventListener('click', () => {
      const _this = this;
      _this.element.classList.add('hide');

      Promise.all(
        _this.element.getAnimations().map(
          function(animation) {
            return animation.finished;
          }
        )
      ).then(
        function() {
          _this.navigation.goToHome();
          return _this.element.remove();
        }
      );
    });
  }
}
