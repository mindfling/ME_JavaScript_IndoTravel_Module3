// * import all modules to index

import {timerControl} from './modules/timer.js';

const heroBanner = document.querySelector('.hero__text');
const heroTimer = document.querySelector('[data-deadline]');
// const heroTimer = document.querySelector('.hero__timer');

timerControl(heroTimer, heroBanner);
