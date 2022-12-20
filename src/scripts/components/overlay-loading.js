class OverlayLoading extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <div id="overlay" class="loading">
        <img src="/images/loading.gif" alt="loader"/>
        <p>Memuat Halaman...</p>
      </div>
    `;
  }
}

customElements.define('overlay-loading', OverlayLoading);
