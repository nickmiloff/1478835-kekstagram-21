'use strict';

const PICTURES_DEFAULT_COUNT = 25;
const mockDataObj = {
  description: [
    `Moments...`,
    `Смотри что сфотографировал!`,
    `Поймал такой момент.`,
    `Тест новой камеры.`,
    `Крутая фотка получилась =)`
  ],
  message: [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
  ],
  name: [
    `Анастасия`,
    `Артем`,
    `Борис`,
    `Виолетта`,
    `Георгий`,
    `Елена`,
    `Ирина`,
    `Леон`,
    `Никита`,
    `Татьяна`,
    `Федор`,
    `Яна`
  ]
};
const pictureTemplateNode = document.querySelector(`#picture`).content.querySelector(`.picture`);
const picturesContainerNode = document.querySelector(`.pictures`);
const bodyNode = document.querySelector(`body`);
const bigPictureNode = document.querySelector(`.big-picture`);
const commentTemplateNode = bigPictureNode.querySelector(`.social__comment`).cloneNode(true);
const commentsContainerNode = bigPictureNode.querySelector(`.social__comments`);
let picturesArr = [];

function generateCommentsArr() {
  const commentsArr = [];

  for (let i = 0; i < window.getRandomInt(1, 2); i++) {
    commentsArr.push({
      avatar: `img/avatar-${window.getRandomInt(1, 6)}.svg`,
      message: window.getRandomElem(mockDataObj.message),
      name: window.getRandomElem(mockDataObj.name)
    });
  }

  return commentsArr;
}

function generatePicturesDataArr(number = PICTURES_DEFAULT_COUNT) {
  const pictures = [];

  for (let i = 0; i < number; i++) {
    pictures.push({
      url: `photos/${i + 1}.jpg`,
      description: window.getRandomElem(mockDataObj.description),
      likes: window.getRandomInt(15, 200),
      comments: generateCommentsArr()
    });
  }

  return pictures;
}

function getHtmlPicturesFragment(pictures) {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const elem = pictureTemplateNode.cloneNode(true);

    elem.querySelector(`.picture__img`).src = picture.url;
    elem.querySelector(`.picture__likes`).textContent = picture.likes;
    elem.querySelector(`.picture__comments`).textContent = picture.comments.length;

    fragment.appendChild(elem);
  });

  return fragment;
}

function getHtmlCommentsFragment(comments) {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const elem = commentTemplateNode.cloneNode(true);

    elem.querySelector(`.social__picture`).src = comment.avatar;
    elem.querySelector(`.social__picture`).alt = comment.name;
    elem.querySelector(`.social__text`).textContent = comment.message;

    fragment.appendChild(elem);
  });

  return fragment;
}

function showBigPicture(picture) {
  const commentsHtmlFragment = getHtmlCommentsFragment(picture.comments);

  bigPictureNode.querySelector(`.big-picture__img`).querySelector(`img`).src = picture.url;
  bigPictureNode.querySelector(`.likes-count`).textContent = picture.likes;
  bigPictureNode.querySelector(`.comments-count`).textContent = picture.comments.length;
  bigPictureNode.querySelector(`.social__caption`).textContent = picture.description;

  bigPictureNode.querySelector(`.social__comment-count`).classList.add(`hidden`);
  bigPictureNode.querySelector(`.comments-loader`).classList.add(`hidden`);
  bodyNode.classList.add(`modal-open`);

  commentsContainerNode.textContent = ``;
  commentsContainerNode.appendChild(commentsHtmlFragment);

  bigPictureNode.classList.remove(`hidden`);
}

function initPictures() {
  picturesArr = generatePicturesDataArr();
  const picturesHtmlFragment = getHtmlPicturesFragment(picturesArr);
  picturesContainerNode.appendChild(picturesHtmlFragment);
}

initPictures();
showBigPicture(picturesArr[0]);
