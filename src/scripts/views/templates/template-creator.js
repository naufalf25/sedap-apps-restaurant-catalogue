import CONFIG from '../../global/config';

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant__post">
    <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name || '-'}">
    <div class="restaurant__content">
      <span class="restaurant__rating" id="rating"><i class="fa fa-star" aria-hidden="true"></i> Rating: ${restaurant.rating || '-'}</span>
      <h2 class="restaurant__title"><a href="#/detail/${restaurant.id}">${restaurant.name || '-'}</a></h2>
      <p>${restaurant.description || '-'}</p>
      <p class="read__detail"><a href="#/detail/${restaurant.id}">Baca Selengkapnya <i class="fa fa-angle-right"></i></a></p>
    </div>
    <div class="restaurant__city">Kota ${restaurant.city || '-'}</div>
  </div>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <h1>Informasi Detail Restoran ${restaurant.name}</h1>
  <div class="restaurant__detail">
    <div class="detail__header">
      <img src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
      <div class="detail__headerContent">
        <h2>${restaurant.name}</h2>
        <h3>${restaurant.address}</h3>
        <h4>${restaurant.city}</h4>
        <p>${restaurant.description}</p>
      </div>
    </div>
    <div class="detail__menu">
      <h1>Daftar Menu Pada Restoran ${restaurant.name}</h1>
      <div class="detail__menuGroup">
        <div class="detail__foodMenu">
          <h2>Daftar Menu Makanan</h2>
          <table>
            <tbody id="foodMenu"></tbody>
          </table>
        </div>
        <div class="detail__drinkMenu">
          <h2>Daftar Menu Minuman</h2>
          <table>
            <tbody id="drinkMenu"></tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="detail__review">
      <h1>Review Restoran Oleh Pelanggan</h1>
      <div id="reviewPost" class="review__post"></div>
    </div>
    <div class="detail__addReview">
      <h1>Tambahkan Review Singkat Anda Tentang Restoran Ini</h1>
      <div class="addReview__form">
        <div class="form__group">
          <label for="inputName">Nama Anda</label>
          <input id="inputName" class="form__control" type="text" placeholder="Masukkan Nama Anda" required/>
        </div>
        <div class="form__group">
          <label for="inputReview">Review Anda</label>
          <input id="inputReview" class="form__control" type="text" placeholder="Masukkan Review Anda" required/>
        </div>
        <div class="form__group">
          <button id="submitReview" class="form__submit">Tambahkan Review</button>
        </div>
      </div>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
  <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createUnlikedButtonTemplate,
};
