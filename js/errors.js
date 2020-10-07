'use strict';

{
  const loadErrorNode = document.querySelector(`.pictures-error`);

  const load = (message) => {
    loadErrorNode.querySelector(`.pictures-error__title`).textContent = message;
    loadErrorNode.classList.remove(`hidden`);

    setTimeout(() => {
      loadErrorNode.classList.add(`hidden`);
    }, 5000);
  };

  window.errors = {
    load
  };
}
