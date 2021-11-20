import './styles/style.scss';

import { Home } from './scripts/pages/Home';

const mainContainer = document.querySelector('#main');
const home = new Home(mainContainer);

console.log('Hello world!', home);
