// * import all modules to index

import {accordionControl} from './modules/accordion.js';
import {flyControl} from './modules/fly.js';
import {menuControl} from './modules/menu.js';
import {timerControl} from './modules/timer.js';
// import {tourControl} from './modules/tour.js';
// import {reservationControl} from './modules/reservation.js';

const heroBanner = document.querySelector('.hero__text');
const heroTimer = document.querySelector('.hero__timer');
timerControl(heroTimer, heroBanner);

menuControl();

const accordion = document.querySelector('.travel__accordion');
accordionControl(accordion);

flyControl();

// tourControl();
// reservationControl();
import './modules/tourReservation.js';
