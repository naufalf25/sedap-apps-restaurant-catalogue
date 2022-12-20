import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurant from '../src/scripts/data/favorite-restaurant';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view';

describe('Searching Restaurants', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.querySelector('#inputQuery');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructorPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurant);
    presenter = new FavoriteRestaurantSearchPresenter({ 
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructorPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurants('restaurant a');
  
      expect(presenter.latestQuery).toEqual('restaurant a');
    });
  
    it('should ask the model to search for liked restaurants', () => {
      searchRestaurants('restaurant a');
  
      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('restaurant a');
    });
  
    it('should show - when the restaurant returned does not contain a title', (done) => {
      document.querySelector('#restaurants').addEventListener('restaurants:updated', () => {
        const restaurantTitles = document.querySelectorAll('.restaurant__title');
        expect(restaurantTitles.item(0).textContent).toEqual('-');
        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([
        { id: 444 },
      ]);

      searchRestaurants('restaurant a');
    });
  
    it('should show the restaurant found by Favorite Restaurants', (done) => {
      document.querySelector('#restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant__post').length).toEqual(3);
        done();
      });
  
      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([
        { id: 111, name: 'restaurant aaa' },
        { id: 222, name: 'ada juga restaurant abc' },
        { id: 333, name: 'ini juga bisa restaurant cab' },
      ]);
  
      searchRestaurants('restaurant a');
    });
  
    it('should show the name of the restaurant found by Favorite Restaurants', (done) => {
      document.querySelector('#restaurants').addEventListener('restaurants:updated', () => {
        const restaurantTitles = document.querySelectorAll('.restaurant__title');
        expect(restaurantTitles.item(0).textContent).toEqual('restaurant aaa');
        expect(restaurantTitles.item(1).textContent).toEqual('ada juga restaurant abc');
        expect(restaurantTitles.item(2).textContent).toEqual('ini juga bisa restaurant cab');
        done();
      });
  
      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([
        { id: 111, name: 'restaurant aaa' },
        { id: 222, name: 'ada juga restaurant abc' },
        { id: 333, name: 'ini juga bisa restaurant cab' },
      ]);
  
      searchRestaurants('restaurant a');
    });
  });

  describe('when query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurants('  ');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      searchRestaurants('    ');
      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
    });
  });

  describe('when no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document.querySelector('#restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([]);

      searchRestaurants('restaurant a');
    });

    it('should not show any restaurant', (done) => {
      document.querySelector('#restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant').length).toEqual(0);
        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([]);

      searchRestaurants('restaurant a');
    });
  });
});