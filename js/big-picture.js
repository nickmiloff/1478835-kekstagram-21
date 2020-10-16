'use strict';

const pictureNode = document.querySelector(`.big-picture`);
const pictureCloseButtonNode = document.querySelector(`.big-picture__cancel`);

const pictureEscKeydownHandler = (evt) => {
  if (window.utils.isEscButton(evt.key)) {
    closePicture();
  }
};

const renderPicture = (picture) => {
  pictureNode.querySelector(`.big-picture__img`).querySelector(`img`).src = picture.url;
  pictureNode.querySelector(`.likes-count`).textContent = picture.likes;
  pictureNode.querySelector(`.comments-count`).textContent = picture.comments.length;
  pictureNode.querySelector(`.social__caption`).textContent = picture.description;

  window.comments.set(picture.comments);
};

const openPicture = () => {
  document.body.classList.add(`modal-open`);
  pictureNode.classList.remove(`hidden`);
  document.addEventListener(`keydown`, pictureEscKeydownHandler);
};

const closePicture = () => {
  document.body.classList.remove(`modal-open`);
  pictureNode.classList.add(`hidden`);
  document.removeEventListener(`keydown`, pictureEscKeydownHandler);
};

pictureCloseButtonNode.addEventListener(`click`, closePicture);

window.bigPicture = {
  render: renderPicture,
  open: openPicture
};
