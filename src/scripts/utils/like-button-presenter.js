import { createLikeButtonTemplate, createUnlikedButtonTemplate } from '../views/templates/template-creator';

const LikeButtonInitiator = {
  async init({ LikeButtonContainer, favoriteRestaurants, restaurant }) {
    this._likeButtonContainer = LikeButtonContainer;
    this._restaurant = restaurant;
    this._favoriteRestaurants = favoriteRestaurants;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await this._favoriteRestaurants.getRestaurant(id);
    return !!restaurant;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.putRestaurant(this._restaurant);

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
              icon: 'success',
              title: 'Berhasil Menambahkan Restoran Ke Daftar Favorit',
            });
          })
          .catch((error) => console.log(error));

      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnlikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.deleteRestaurant(this._restaurant.id);

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
              icon: 'success',
              title: 'Berhasil Menghapus Restoran Ini Dari Daftar Favorit',
            });
          })
          .catch((error) => console.log(error));

      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
