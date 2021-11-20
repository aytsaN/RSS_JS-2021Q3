import './styles/style.scss';

import { QuizStorage } from './scripts/QuizStorage';
import { HomePage } from './scripts/pages/HomePage';
import { Navigation } from './scripts/Navigation';

const categoriesName = [
  'impressionism',
  'expressionism',
  'avant-garde',
  'nude',
  'renaissance',
  'still life',
  'landscape',
  'surrealism',
  'portrait',
  'kitsch',
  'minimalism',
  'interior'
];

const mainContainer = document.querySelector('#main');

const storage = new QuizStorage(categoriesName);

const navigation = new Navigation(mainContainer, storage, categoriesName);
const homePage = new HomePage(mainContainer, navigation);

window.addEventListener('load', () => storage.getLocalStorage());
window.addEventListener('beforeunload', () => storage.setLocalStorage());
