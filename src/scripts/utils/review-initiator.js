import Swal from 'sweetalert2';
import RestaurantSource from '../data/Restaurant-source';

const ReviewInitiator = {
  init({ id, name, review }) {
    const reviewer = {
      id: `${id}`,
      name,
      review,
    };

    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Review berhasil ditambahkan',
    });

    this._addReview(reviewer);
  },

  async _addReview(reviewer) {
    const response = await RestaurantSource.addReviewRestaurant(reviewer);
    const getReview = response.customerReviews;

    this._getReviewUpdate(getReview);
  },

  async _getReviewUpdate(getReview) {
    const reviewPost = document.querySelector('#reviewPost');
    reviewPost.innerHTML = '';

    getReview.forEach((review) => {
      reviewPost.innerHTML += `
        <div class="review__card">
          <h2><i>"<span>${review.review}</span>"</i></h2>
          <p class="review__sender">Oleh <span>${review.name}</span></p>
          <p class="review__date">${review.date}</p>
        </div>
      `;
    });
  },
};

export default ReviewInitiator;
