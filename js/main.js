'use strict';

const PICTURES_DEFAULT_COUNT = 25;
const templates = {
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
const template = document.querySelector(`#picture`).content.querySelector(`.picture`);
const picturesContainer = document.querySelector(`.pictures`);

function generateComments() {
  const commentsArr = [];

  for (let i = 0; i < window.getRandomInt(1, 2); i++) {
    commentsArr.push({
      avatar: `img/avatar-${window.getRandomInt(1, 6)}.svg`,
      message: window.getRandomElem(templates.message),
      name: window.getRandomElem(templates.message)
    });
  }

  return commentsArr;
}

function generatePicturesDataArr(number = PICTURES_DEFAULT_COUNT) {
  const pictures = [];

  for (let i = 0; i < number; i++) {
    pictures.push({
      url: `photos/${i + 1}.jpg`,
      description: window.getRandomElem(templates.description),
      likes: window.getRandomInt(15, 200),
      comments: generateComments()
    });
  }

  return pictures;
}

function getHtmlPictures(pictures) {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const elem = template.cloneNode(true);

    elem.querySelector(`.picture__img`).src = picture.url;
    elem.querySelector(`.picture__likes`).textContent = picture.likes;
    elem.querySelector(`.picture__comments`).textContent = picture.comments.length;

    fragment.appendChild(elem);
  });

  return fragment;
}

function initPictures() {
  const picturesArr = generatePicturesDataArr();
  picturesContainer.appendChild(getHtmlPictures(picturesArr));
}

initPictures();
