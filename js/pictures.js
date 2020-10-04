'use strict';

{
  const picturesContainerNode = document.querySelector(`.pictures`);
  const pictureTemplateNode = document.querySelector(`#picture`).content.querySelector(`.picture`);

  const getHtmlPicturesFragment = (pictures) => {
    const fragment = document.createDocumentFragment();

    pictures.forEach((picture) => {
      const elem = pictureTemplateNode.cloneNode(true);

      elem.querySelector(`.picture__img`).src = picture.url;
      elem.querySelector(`.picture__likes`).textContent = picture.likes;
      elem.querySelector(`.picture__comments`).textContent = picture.comments.length;

      fragment.appendChild(elem);
    });

    return fragment;
  };

  const indexOfPicture = (picture) => {
    const picturesNodeList = picturesContainerNode.querySelectorAll(`.picture`);
    return Array.from(picturesNodeList).indexOf(picture);
  };

  picturesContainerNode.addEventListener(`click`, (evt) => {
    const chosenPictureNode = evt.target.closest(`.picture`);
    if (chosenPictureNode) {
      const chosenPictureIndex = indexOfPicture(chosenPictureNode);

      window.picture.render(window.picturesArr[chosenPictureIndex]);
      window.picture.open();
    }
  });

  window.pictures = {
    init: () => {
      const picturesHtmlFragment = getHtmlPicturesFragment(window.picturesArr);
      picturesContainerNode.appendChild(picturesHtmlFragment);
    }
  };
}
