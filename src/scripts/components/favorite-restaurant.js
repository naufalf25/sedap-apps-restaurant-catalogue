class FavoriteRestaurant extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <h1>Daftar Restoran Favorit Anda</h1>
      <div class="inputSearch">
        <input id="inputQuery" type="text" placeholder="Cari Restoran Favorit">
        <input id="searchSubmit" type="submit" value="Cari">
      </div>
      <div id="restaurants" class="restaurants"></div>
    `;
  }
}

customElements.define('favorite-restaurant', FavoriteRestaurant);
