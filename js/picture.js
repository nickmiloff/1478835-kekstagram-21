'use strict';

{
  const pictureNode = document.querySelector(`.big-picture`);
  const pictureCloseButtonNode = document.querySelector(`.big-picture__cancel`);
  const commentTemplateNode = pictureNode.querySelector(`.social__comment`).cloneNode(true);
  const commentsContainerNode = pictureNode.querySelector(`.social__comments`);

  const getHtmlCommentsFragment = (comments) => {
    const fragment = document.createDocumentFragment();

    comments.forEach((comment) => {
      const elem = commentTemplateNode.cloneNode(true);

      elem.querySelector(`.social__picture`).src = comment.avatar;
      elem.querySelector(`.social__picture`).alt = comment.name;
      elem.querySelector(`.social__text`).textContent = comment.message;

      fragment.appendChild(elem);
    });

    return fragment;
  };

  const pictureEscKeydownHandler = (evt) => {
    if (window.utils.isEscButton(evt.key)) {
      closePicture();
    }
  };

  const renderPicture = (picture) => {
    const commentsHtmlFragment = getHtmlCommentsFragment(picture.comments);

    pictureNode.querySelector(`.big-picture__img`).querySelector(`img`).src = picture.url;
    pictureNode.querySelector(`.likes-count`).textContent = picture.likes;
    pictureNode.querySelector(`.comments-count`).textContent = picture.comments.length;
    pictureNode.querySelector(`.social__caption`).textContent = picture.description;

    commentsContainerNode.textContent = ``;
    commentsContainerNode.appendChild(commentsHtmlFragment);
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

  const initPicture = () => {
    pictureNode.querySelector(`.social__comment-count`).classList.add(`hidden`);
    pictureNode.querySelector(`.comments-loader`).classList.add(`hidden`);
  };

  pictureCloseButtonNode.addEventListener(`click`, closePicture);

  window.picture = {
    render: renderPicture,
    open: openPicture,
    close: closePicture,
    init: initPicture
  };
}
