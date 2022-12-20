class RestaurantList extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <h1>Jelajahi beberapa restoran</h1>
      <div id="restaurants" class="restaurants"></div>
    `;
  }
}

customElements.define('restaurant-list', RestaurantList);
