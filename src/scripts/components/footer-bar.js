class FooterBar extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <p class="footer__dataSource">Semua data didapatkan dari <a href="https://restaurant-api.dicoding.dev/" target="_blank">Restaurant API Dicoding</a></p>
      <p class="footer__copyright">Copyright &copy; 2022 - Sedap Apps | Muhammad Naufal Farras</p>
    `;
  }
}

customElements.define('footer-bar', FooterBar);
