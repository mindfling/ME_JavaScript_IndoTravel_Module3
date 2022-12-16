/* eslint-disable max-len */
// * test fly vertical airplane move with vertical

export const flyControl = () => {
  const fly = document.createElement('div');
  fly.classList.add('fly', 'fly_fixed', 'fly_vertical');
  const flySize = 50;
  let top = 0;
  fly.style.cssText = `
    display: block;
    position: fixed;
    width: ${flySize}px;
    height: ${flySize}px;
    top: ${top};
    right: 0;
    z-index: 50;
    opacity: 1;
    background: url(./img/airplane.svg) center center / cover no-repeat;
    background-color: transparent;
    transform: rotateZ(180deg);
    cursor: pointer;
  `;

  document.body.append(fly);
  let nextOffset = 0;
  let prevOffset = nextOffset;

  const calcPositionFly = () => {
    prevOffset = nextOffset;
    const pageOffset = window.pageYOffset;
    nextOffset = pageOffset;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const maxDown = clientHeight - fly.clientHeight;
    const maxScroll = scrollHeight - clientHeight;
    const percentScroll = Math.round((pageOffset * 100) / maxScroll);
    top = maxDown * percentScroll / 100;
    console.log('percentScroll: ', percentScroll);
    let opacity = 1;
    if (percentScroll > 10) {
      opacity = 1;
    } else {
      opacity = percentScroll / 10;
    }
    console.log('opacity: ', opacity);
    fly.style.opacity = opacity;
    if (prevOffset < nextOffset) {
      fly.style.transform = `translateY(${top}px) rotate(180deg)`;
      console.log('скролим вниз');
    } else {
      fly.style.transform = `translateY(${top}px) rotate(0)`;
      console.log('скролим вверх');
    }
    return;
  };
  requestAnimationFrame(calcPositionFly);

  document.addEventListener('scroll', (event) => {
    requestAnimationFrame(calcPositionFly);
  });

  fly.addEventListener('click', (event) => {
    alert('fly');
  });
};
