'use strict';

{
  const picturesContainerNode = document.querySelector(`.pictures`);
  const pictureTemplateNode = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const picturesFiltersNode = document.querySelector(`.img-filters`);

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

      window.bigPicture.render(window.picturesArr[chosenPictureIndex]);
      window.bigPicture.open();
    }
  });

  const removePicturesNodes = () => {
    const picturesNodes = document.querySelectorAll(`.picture`);

    for (const picture of picturesNodes) {
      picturesContainerNode.removeChild(picture);
    }
  };

  const renderPictures = () => {
    const picturesHtmlFragment = getHtmlPicturesFragment(window.picturesArr);
    removePicturesNodes();
    picturesContainerNode.appendChild(picturesHtmlFragment);
  };

  window.pictures = {
    init: () => {
      renderPictures();
      window.pictures.defaultPicuresArr = window.picturesArr.slice();
      picturesFiltersNode.classList.remove(`img-filters--inactive`);
    },
    render: renderPictures
  };
}
