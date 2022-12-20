const assert = require('assert');

Feature('Liking Restaurants, Give Reviews');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('Showing empty favorite restaurants',  ({ I }) => {
  I.seeElement('#inputQuery');
  I.waitForText('Restoran Favorit Tidak Ditemukan', 10);
  I.waitForElement('.restaurant-item__not__found', 10);
});

Scenario('Liking One Restaurant and Unliking It', async ({ I }) => {
  I.waitForText('Restoran Favorit Tidak Ditemukan', 10);

  I.amOnPage('/');

  I.waitForElement('.restaurant__title a', 10);
  const firstRestaurant = locate('.restaurant__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton', 10);
  I.click('#likeButton');
  I.waitForElement('.swal2-container', 10);
  I.wait(3);

  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant__post', 10);
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant__title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  I.waitForElement('.restaurant__title a', 10);
  I.click(locate('.restaurant__title a').first());

  I.waitForElement('#likeButton', 10);
  I.click('#likeButton');
  I.waitForElement('.swal2-container', 10);
  I.wait(3);

  I.amOnPage('/#/favorite');
  I.waitForText('Restoran Favorit Tidak Ditemukan', 10);
});

Scenario('Searching Favorite Restaurant', async ({ I }) => {
  I.waitForText('Restoran Favorit Tidak Ditemukan', 10);

  I.amOnPage('/');

  I.waitForElement('.restaurant__title a', 10);

  const titles = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant__title a').at(i));
    I.waitForElement('#likeButton');
    I.click('#likeButton');
    titles.push(await I.grabTextFrom('.detail__headerContent h2'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#inputQuery');

  const searchQuery = titles[1].substring(1, 3);
  const matchingRestaurants = titles.filter((title) => title.indexOf(searchQuery) !== -1);

  I.fillField('#inputQuery', searchQuery);
  I.pressKey('Enter');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant__post');
  assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants);
  
  matchingRestaurants.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.restaurant__title').at(index + 1));
    assert.strictEqual(title, visibleTitle);
  });
});

Scenario('Give Restaurant\'s Review', async ({ I }) => {
  I.waitForText('Restoran Favorit Tidak Ditemukan', 10);

  I.amOnPage('/');

  I.waitForElement('.restaurant__title a', 10);
  I.click(locate('.restaurant__title a').first());

  I.waitForElement('#likeButton', 10);
  I.click('#likeButton');
  I.waitForElement('.swal2-container', 10);

  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant__post', 10);
  I.click(locate('.restaurant__title a').first());

  I.waitForElement('#inputName', 10);
  I.waitForElement('#inputReview', 10);

  const nameReview = 'Anonim';
  const reviewText = 'Sangat enak dan direkomendasikan!';
  I.fillField('#inputName', nameReview);
  I.fillField('#inputReview', reviewText);

  I.seeElement('#submitReview');
  I.click('#submitReview');

  I.waitForElement('.review__card', 10);
  const latestNameReview = await I.grabTextFrom(locate('.review__card .review__sender span').last());
  const latestReview = await I.grabTextFrom(locate('.review__card h2 i span').last());

  assert.strictEqual(nameReview, latestNameReview);
  assert.strictEqual(reviewText, latestReview);
});
