import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/Restaurant-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import FavoriteRestaurant from '../../data/favorite-restaurant';

const Detail = {
  async render() {
    return `
      <div id="restaurantDetail"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    this._hiddenHero();

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurantDetail');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
    const submitReviewButton = document.querySelector('#submitReview');

    this._menu(restaurant);
    this._review(restaurant);

    import('../../utils/like-button-presenter')
      .then((module) => module.default)
      .then((like) => {
        like.init({
          LikeButtonContainer: document.querySelector('#likeButtonContainer'),
          favoriteRestaurants: FavoriteRestaurant,
          restaurant,
        });
      })
      .catch((error) => console.log(error));

    submitReviewButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = document.querySelector('#inputName').value;
      const review = document.querySelector('#inputReview').value;

      if (name && review) {
        import('../../utils/review-initiator')
          .then((module) => module.default)
          .then((addReview) => {
            addReview.init({
              id: `${restaurant.id}`,
              name,
              review,
            });
          })
          .catch((error) => console.log(error));

        document.querySelector('#inputName').value = '';
        document.querySelector('#inputReview').value = '';
      } else {
        import('sweetalert2')
          .then(({ default: SweetAlert }) => {
            const Toast = SweetAlert.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', SweetAlert.stopTimer);
                toast.addEventListener('mouseleave', SweetAlert.resumeTimer);
              },
            });
    
            Toast.fire({
              icon: 'error',
              title: 'Lengkapilah Form Review Terlebih Dahulu!',
            });
          })
          .catch((error) => console.log(error));
      }
    });
  },

  _hiddenHero() {
    const hero = document.querySelector('hero-header');
    hero.style.display = 'none';
  },

  _menu(restaurant) {
    const foodMenu = document.querySelector('#foodMenu');
    const drinkMenu = document.querySelector('#drinkMenu');

    const { foods, drinks } = restaurant.menus;

    foods.forEach((food) => {
      foodMenu.innerHTML += `
        <tr>
          <td>${food.name}</td>
        </tr>
      `;
    });

    drinks.forEach((drink) => {
      drinkMenu.innerHTML += `
        <tr>
          <td>${drink.name}</td>
        </tr>
      `;
    });
  },

  _review(restaurant) {
    const { customerReviews } = restaurant;
    const reviewPost = document.querySelector('#reviewPost');

    customerReviews.forEach((review) => {
      reviewPost.innerHTML += `
        <div class="review__card">
          <h2><i>"${review.review}"</i></h2>
          <p class="review__sender">Oleh ${review.name}</p>
          <p class="review__date">${review.date}</p>
        </div>
      `;
    });
  },
};

export default Detail;
