import 'regenerator-runtime';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import './components/app-bar';
import './components/hero-header';
import './components/footer-bar';
import './components/restaurant-list';
import './components/favorite-restaurant';
import './components/overlay-loading';
import '../styles/main.scss';
import '../styles/responsive.scss';
import swRegister from './utils/sw-register';

const START = 3;
const NUMBER_OF_IMAGES = 50;

import('./views/app')
  .then(({ default: App }) => {
    const app = new App({
      button: document.querySelector('#hamburger'),
      drawer: document.querySelector('#navside'),
      content: document.querySelector('#mainContent'),
    });

    window.addEventListener('hashchange', () => {
      app.renderPage();
    });

    window.addEventListener('load', () => {
      app.renderPage();
    });
  })
  .catch((error) => console.log(error));

window.addEventListener('load', async () => {
  await swRegister();
  document.querySelector('overlay-loading').classList.add('hiddenLoading');
});
