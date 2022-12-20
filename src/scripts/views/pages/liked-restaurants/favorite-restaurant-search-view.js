import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantSearchView {
  getTemplate() {
    return `
    <h1>Daftar Restoran Favorit Anda</h1>
    <div class="inputSearch">
      <input id="inputQuery" type="text" placeholder="Cari Restoran Favorit">
      <input id="searchSubmit" type="submit" value="Cari">
    </div>
    <div id="restaurants" class="restaurants"></div>
    `;
  }

  getDisplayTemplate() {
    return `
      <favorite-restaurant></favorite-restaurant>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.querySelector('#inputQuery').addEventListener('change', (e) => {
      callback(e.target.value);
    });
  }

  showFavoriteRestaurants(restaurants = []) {
    const restaurantContainer = document.querySelector('#restaurants');
    let html;

    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
      restaurantContainer.classList.add('visibleItem');
      restaurantContainer.classList.remove('notFoundItem');
    } else {
      html = this._getEmptyRestaurantTemplate();
      restaurantContainer.classList.add('notFoundItem');
      restaurantContainer.classList.remove('visibleItem');
    }

    restaurantContainer.innerHTML = html;

    restaurantContainer.dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `<div class="restaurant-item__not__found"><p>Restoran Favorit Tidak Ditemukan</p></div>`;
  }
}

export default FavoriteRestaurantSearchView;
