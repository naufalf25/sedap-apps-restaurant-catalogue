import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';
import FavoriteRestaurant from '../src/scripts/data/favorite-restaurant';

describe('Favorite Restaurant Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestaurant.getAllRestaurants()).forEach(async (restaurant) => {
      await FavoriteRestaurant.deleteRestaurant(restaurant.id);
    });
  });
  
  itActsAsFavoriteRestaurantModel(FavoriteRestaurant);
});