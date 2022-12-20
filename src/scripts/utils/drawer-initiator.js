const DrawerInitiator = {
  init({ button, drawer, content }) {
    button.addEventListener('click', (e) => {
      this._toggleDrawer(e, drawer);
    });

    content.addEventListener('click', (e) => {
      this._closeDrawer(e, drawer);
    });
  },

  _toggleDrawer(e, drawer) {
    e.stopPropagation();
    drawer.classList.toggle('display');
  },

  _closeDrawer(e, drawer) {
    e.stopPropagation();
    drawer.classList.remove('display');
    this._defaultHamburger();
  },

  _defaultHamburger() {
    const hamburgerMenu = document.querySelector('#hamburgerMenu');
    hamburgerMenu.classList.remove('active');
  }
};

export default DrawerInitiator;
