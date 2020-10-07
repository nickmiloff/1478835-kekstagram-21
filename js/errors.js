'use strict';

{
  const mainNode = document.querySelector(`main`);
  const loadErrorNode = document.querySelector(`#pictures-error`).content.querySelector(`.pictures-error`);
  const uploadErrorNode = document.querySelector(`#error`).content.querySelector(`.error`);
  const uploadSuccessNode = document.querySelector(`#success`).content.querySelector(`.success`);

  const createMessageModal = (elem, type) => {
    const elemNode = mainNode.appendChild(elem);

    const closeElemNode = () => {
      mainNode.removeChild(elemNode);
      document.removeEventListener(`keydown`, uploadEscKeydownHandler);
    };

    const uploadEscKeydownHandler = (evt) => {
      if (window.utils.isEscButton(evt.key)) {
        closeElemNode();
      }
    };

    elemNode.querySelector(`.${type}__button`).addEventListener(`click`, () => {
      closeElemNode();
    });

    document.addEventListener(`keydown`, uploadEscKeydownHandler);

    elemNode.addEventListener(`click`, (evt) => {
      if (!evt.target.closest(`.${type}__inner`)) {
        closeElemNode();
      }
    });
  };

  const loadError = (message) => {
    const elem = loadErrorNode.cloneNode(true);

    elem.querySelector(`.pictures-error__title`).textContent = message;
    const elemNode = mainNode.appendChild(elem);

    setTimeout(() => {
      mainNode.removeChild(elemNode);
    }, 5000);
  };

  const uploadError = (_) => {
    const elem = uploadErrorNode.cloneNode(true);

    createMessageModal(elem, `error`);
  };

  const uploadSuccess = () => {
    const elem = uploadSuccessNode.cloneNode(true);

    createMessageModal(elem, `success`);
  };

  window.errors = {
    loadError,
    uploadError,
    uploadSuccess
  };
}
