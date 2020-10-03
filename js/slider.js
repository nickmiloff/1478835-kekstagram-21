'use strict';

const sliderNode = document.querySelector(`.img-upload__effect-level`);
const lineNode = sliderNode.querySelector(`.effect-level__line`);
const valueNode = sliderNode.querySelector(`.effect-level__value`);
const pinNode = sliderNode.querySelector(`.effect-level__pin`);
const depthNode = sliderNode.querySelector(`.effect-level__depth`);

const sliderMouseDownHandler = (callback) => {
  const sliderMouseMoveHandler = (evt) => {
    const movementX = pinNode.offsetLeft + evt.movementX;
    let result = movementX / lineNode.offsetWidth * 100;

    if (result > 100) {
      result = 100;
    } else if (result < 0) {
      result = 0;
    }

    pinNode.style.left = `${result}%`;
    depthNode.style.width = `${result}%`;
    valueNode.value = Math.floor(result);

    callback(Math.floor(result));
  };

  const sliderMouseUpHandler = () => {
    document.removeEventListener(`mousemove`, sliderMouseMoveHandler);
    document.removeEventListener(`mouseup`, sliderMouseUpHandler);
  };

  document.addEventListener(`mousemove`, sliderMouseMoveHandler);
  document.addEventListener(`mouseup`, sliderMouseUpHandler);
};

function setSliderValue(value = 0) {
  pinNode.style.left = `${value}%`;
  depthNode.style.width = `${value}%`;
  valueNode.value = value;
}

window.slider = {
  node: sliderNode,
  value: valueNode,
  pin: pinNode,
  handler: sliderMouseDownHandler,
  setValue: setSliderValue
};
