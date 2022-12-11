// * accordion interactive module

export const accordionControl = (accordion) => {
  if (!accordion) {
    console.log('accordion: ', accordion);
    return;
  }
  const travelItems = accordion.querySelectorAll('.travel__item');
  const travelItemBtns = accordion.querySelectorAll('.travel__item-title');
  console.log('travelItems: ', travelItems);
  console.log('travelItemBtns: ', travelItemBtns);

  travelItems.forEach((item, index) => {
    console.log();
    item.classList.remove('travel__item_active');
  });

  travelItemBtns.forEach((btn, index) => {
    btn.addEventListener('click', event => {
      const target = event.target;
      console.log(target, index);
      travelItems[index].classList.toggle('travel__item_active');
    });
  });

  return;
};
