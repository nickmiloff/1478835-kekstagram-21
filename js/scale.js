'use strict';

{
  const STEP = 25;
  const MIN_SCALE = STEP;
  const MAX_SCALE = 100;
  const scaleNode = document.querySelector(`.img-upload__scale`);
  const scaleElements = {
    value: scaleNode.querySelector(`.scale__control--value`),
    smallerButton: scaleNode.querySelector(`.scale__control--smaller`),
    biggerButton: scaleNode.querySelector(`.scale__control--bigger`)
  };

  const setScaleValue = (value = 100) => {
    if (value - STEP < MIN_SCALE) {
      scaleElements.value.value = `${MIN_SCALE}%`;
      window.preview.img.style.transform = `scale(${MIN_SCALE / 100})`;
    } else if (value + STEP > MAX_SCALE) {
      scaleElements.value.value = `${MAX_SCALE}%`;
      window.preview.img.style.transform = `scale(${MAX_SCALE / 100})`;
    } else {
      scaleElements.value.value = `${value}%`;
      window.preview.img.style.transform = `scale(${value / 100})`;
    }
  };

  scaleElements.smallerButton.addEventListener(`click`, () => {
    const currentValue = scaleElements.value.value;
    setScaleValue(parseInt(currentValue, 10) - STEP);
  });

  scaleElements.biggerButton.addEventListener(`click`, () => {
    const currentValue = scaleElements.value.value;
    setScaleValue(parseInt(currentValue, 10) + STEP);
  });

  window.scale = {
    set: setScaleValue
  };
}
