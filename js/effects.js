'use strict';

const effectsListNode = document.querySelector(`.effects__list`);
const effectsParameters = {
  chrome: {
    filter: `grayscale`,
    min: 0,
    max: 1,
    measure: ``
  },
  sepia: {
    filter: `sepia`,
    min: 0,
    max: 1,
    measure: ``
  },
  marvin: {
    filter: `invert`,
    min: 0,
    max: 100,
    measure: `%`
  },
  phobos: {
    filter: `blur`,
    min: 0,
    max: 3,
    measure: `px`
  },
  heat: {
    filter: `brightness`,
    min: 1,
    max: 3,
    measure: ``
  },
};
let currentEffectName = `none`;

const changeEffectValue = (value) => {
  if (currentEffectName !== `none`) {
    const currentEffectParameters = effectsParameters[currentEffectName];
    const currentEffectValue = (currentEffectParameters.max - currentEffectParameters.min) / 100 * value + currentEffectParameters.min;
    window.preview.img.style.filter = `${currentEffectParameters.filter}(${currentEffectValue}${currentEffectParameters.measure})`;
  }
};

const changeEffectName = (effectName = `none`) => {
  currentEffectName = effectName;

  window.preview.img.style.removeProperty(`filter`);
  window.slider.setValue(100);
  changeEffectValue(100);

  const method = effectName !== `none` ? `remove` : `add`;
  window.slider.node.classList[method](`hidden`);
};

effectsListNode.addEventListener(`click`, (evt) => {
  const effectName = evt.target.classList.contains(`effects__radio`) ? evt.target.value : null;
  if (effectName) {
    changeEffectName(effectName);
  }
});

window.slider.pin.addEventListener(`mousedown`, () => {
  window.slider.handler(changeEffectValue);
});
