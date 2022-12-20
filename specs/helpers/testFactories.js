import LikeButtonInitiator from '../../src/scripts/utils/like-button-presenter';
import FavoriteRestaurant from '../../src/scripts/data/favorite-restaurant';

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButtonInitiator.init({
    LikeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestaurants: FavoriteRestaurant,
    restaurant,
  });
};

export { createLikeButtonPresenterWithRestaurant };
