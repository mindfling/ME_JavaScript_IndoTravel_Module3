/* eslint-disable max-len */
// * fly vertical airplane move with vertical
const MIN_WIDTH = 758;
const PLAIN_SIZE = 50;

// * do with raf debounce
const debounce = (fn) => {
  let raf = NaN;
  return (...args) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      fn(...args);
      raf = NaN;
    });
  };
};


const flyInitTop = () => {
  const flySize = 50;
  const fly = document.createElement('div');
  fly.classList.add('fly', 'fly_fixed', 'fly_vertical');
  fly.style.cssText = `
      display: block;
      width: ${flySize}px;
      height: ${flySize}px;
      position: fixed;
      top: 0;
      right: 0;
      background: url(./img/airplane.svg) center center / cover no-repeat;
      background-color: transparent;
      cursor: pointer;
      pointer-events: none;
      z-index: 50;
      opacity: 1;
      transform: rotate(180deg);
      transition: all 200ms ease;
  `;
  fly.nextOffset = 0;
  fly.prevOffset = fly.nextOffset;
  document.body.append(fly);
  fly.addEventListener('click', (event) => {
    if (fly.classList.contains('fly_up')) {
      document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // console.log('в начало страницы');
    } else {
      document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
      // console.log('до конца страницы');
    }
  });
  return fly;
};

const calcPositionFlyUpTop = (fly) => {
  fly.prevOffset = fly.nextOffset;
  fly.nextOffset = window.pageYOffset;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const maxDown = clientHeight - fly.clientHeight;
  const maxScroll = scrollHeight - clientHeight;
  const percentScroll = Math.round((window.pageYOffset * 100) / maxScroll);
  const top = maxDown * percentScroll / 100;
  let opacity = 1;
  if (percentScroll > 10) {
    opacity = 1;
    fly.style.pointerEvents = 'auto';
  } else {
    opacity = percentScroll / 10;
    fly.style.pointerEvents = 'none';
  }
  fly.style.opacity = opacity;
  console.log(fly.prevOffset, fly.nextOffset, fly.prevOffset - fly.nextOffset);
  if (fly.prevOffset === fly.nextOffset) {
    console.log('равно');
    return;
  }
  if (fly.prevOffset < fly.nextOffset) {
    // скролим вниз
    console.log('скролим вниз: ');
    fly.style.transform = `translateY(${top}px) rotate(180deg)`;
    // fly.classList.add('fly_down');
    // fly.classList.remove('fly_up');
  } else {
    // скролим вверх
    console.log('скролим вверх: ');
    fly.style.transform = `translateY(${top}px) rotate(0)`;
    // fly.classList.add('fly_up');
    // fly.classList.remove('fly_down');
  }
};


const flyInitBottom = () => {
  const flySize = PLAIN_SIZE;
  const fly = document.createElement('div');
  fly.classList.add('fly', 'fly_fixed', 'fly_vertical');
  fly.style.cssText = `
      display: block;
      width: ${flySize}px;
      height: ${flySize}px;
      position: fixed;
      bottom: 0;
      right: 0;
      background: url(./img/airplane.svg) center center / cover no-repeat;
      background-color: transparent;
      cursor: pointer;
      pointer-events: none;
      z-index: 50;
      opacity: 1;
      transform: rotate(180deg);
      transition: all 200ms ease;
  `;
  fly.nextOffset = 0;
  fly.prevOffset = fly.nextOffset;
  document.body.append(fly);
  fly.addEventListener('click', (event) => {
    if (fly.classList.contains('fly_up')) {
      document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      console.log('в начало страницы');
    } else {
      document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
      console.log('до конца страницы');
    }
  });
  return fly;
};

const calcPositionFlyDownTop = (fly) => {
  fly.prevOffset = fly.nextOffset;
  fly.nextOffset = window.pageYOffset;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const maxDown = clientHeight - fly.clientHeight;
  const maxScroll = scrollHeight - clientHeight;
  const percentScroll = Math.round((window.pageYOffset * 100) / maxScroll);
  const top = maxDown * percentScroll / 100;

  if (fly.prevOffset === fly.nextOffset) {
    // console.log('равно');
    return;
  }
  if (fly.prevOffset < fly.nextOffset) {
    // скролим вниз
    // console.log('скролим вниз: ');
    fly.style.transform = `translateY(${-top}px) rotate(0deg)`;
    fly.classList.add('fly_down');
    fly.classList.remove('fly_up');
  } else {
    // скролим вверх
    // console.log('скролим вверх: ');
    fly.style.transform = `translateY(${-top}px) rotate(180deg)`;
    fly.classList.add('fly_up');
    fly.classList.remove('fly_down');
  }
};


// const debounceFlyUpTop = debounce(calcPositionFlyUpTop);
const debounceFlyDownTop = debounce(calcPositionFlyDownTop);

// todo with debounce
export const flyControl = () => {
  if (document.documentElement.clientWidth >= MIN_WIDTH) {
    const fly = flyInitBottom();

    requestAnimationFrame(() => {
      debounceFlyDownTop(fly);
    });

    document.addEventListener('scroll', (event) => {
      requestAnimationFrame(() => {
        debounceFlyDownTop(fly);
      });
    });
  } else {
    console.log(`Ширина браузера меньше ${MIN_WIDTH}px`,
      document.documentElement.clientWidth);
  }
};
