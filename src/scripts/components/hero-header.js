class HeroHeader extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <div class="hero__inner">
        <h1>Jelajahi berbagai restoran yang ada di Indonesia</h1>
        <p>Cari restoran yang menurut Anda sangat menarik untuk dikunjungi</p>
      </div>
    `;
  }
}

customElements.define('hero-header', HeroHeader);
