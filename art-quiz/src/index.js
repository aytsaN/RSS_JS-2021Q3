import './styles/style.scss';

import { QuizStorage } from './scripts/QuizStorage';
import { HomePage } from './scripts/pages/HomePage';
import { Navigation } from './scripts/Navigation';
import { Settings } from './scripts/elements/Settings';
import { AudioHandler } from "./scripts/settings/Audio";

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
const audio = new AudioHandler(storage)

const navigation = new Navigation(mainContainer, storage, categoriesName, audio);
const homePage = new HomePage(mainContainer, navigation);

window.addEventListener('load', () => storage.getLocalStorage());
window.addEventListener('beforeunload', () => storage.setLocalStorage());
