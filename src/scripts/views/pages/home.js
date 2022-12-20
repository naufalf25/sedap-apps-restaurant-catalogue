import RestaurantSource from '../../data/Restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <restaurant-list></restaurant-list>
    `;
  },

  async afterRender() {
    this._displayHero();
    this._checkItem();
  },

  _displayHero() {
    const hero = document.querySelector('hero-header');
    hero.style.display = 'flex';
  },

  async _checkItem() {
    const restaurants = await RestaurantSource.listRestaurant();
    const restaurantList = document.querySelector('#restaurants');

    if (restaurants.length > 0) {
      restaurants.forEach((resto) => {
        restaurantList.innerHTML += createRestaurantItemTemplate(resto);
      });
    } else {
      const displayError = document.querySelector('favorite-restaurant');
      displayError.innerHTML += `
        <div class="restaurant__notFound">
          <p>
            Daftar Restoran Tidak Ditemukan! Mohon Hubungi Admin<br>
          </p>
        </div>
      `;
    }
  }
};

export default Home;
