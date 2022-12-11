// * import all modules to index

import {menuControl} from './modules/menu.js';
import {timerControl} from './modules/timer.js';

const heroBanner = document.querySelector('.hero__text');
const heroTimer = document.querySelector('.hero__timer');
// const heroTimer = document.querySelector('[data-deadline]');

timerControl(heroTimer, heroBanner);

menuControl();
