import FavoriteRestaurant from '../../data/favorite-restaurant';
import FavoriteRestaurantSearchView from './liked-restaurants/favorite-restaurant-search-view';

const view = new FavoriteRestaurantSearchView();

const Favorite = {
  async render() {
    return view.getDisplayTemplate();
  },

  async afterRender() {
    this._hiddenHero();
    import('./liked-restaurants/favorite-restaurant-show-presenter')
      .then(({ default: FavoriteRestaurantShowPresenter }) => {
        new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurant });
      })
      .catch((error) => console.log(error));
    import('./liked-restaurants/favorite-restaurant-search-presenter')
      .then(({ default: FavoriteRestaurantSearchPresenter }) => {
        new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurant });
      })
      .catch((error) => console.log(error));

    const restaurantContainer = document.querySelector('#restaurants');
    this._waitForElement('.restaurant-item__not__found').then((elm) => {
      restaurantContainer.classList.add('notFoundItem');
    });
  },

  _hiddenHero() {
    const hero = document.querySelector('hero-header');
    hero.style.display = 'none';
  },

  _waitForElement(element) {
    return new Promise(resolve => {
      if (document.querySelector(element)) {
          return resolve(document.querySelector(element));
      }

      const observer = new MutationObserver(mutations => {
          if (document.querySelector(element)) {
              resolve(document.querySelector(element));
              observer.disconnect();
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
    });
  }
};

export default Favorite;
