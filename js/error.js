'use strict';

{
  const errorTemplateNode = document.querySelector(`#error`).content.querySelector(`.error`).cloneNode(true);
  const errorCloseButtonNode = errorTemplateNode.querySelector(`.error__button`);

  errorCloseButtonNode.addEventListener(`click`, () => {
    errorTemplateNode.classList.add(`hidden`);
  });

  const onError = (message) => {
    errorTemplateNode.querySelector(`.error__title`).textContent = message;
    errorCloseButtonNode.textContent = `Закрыть`;

    document.querySelector(`main`).appendChild(errorTemplateNode);
  };

  window.error = {
    onError,
  };
}
