'use strict';

{
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

  const generateCommentsArr = () => {
    const commentsArr = [];

    for (let i = 0; i < window.utils.getRandomInt(1, 2); i++) {
      commentsArr.push({
        avatar: `img/avatar-${window.utils.getRandomInt(1, 6)}.svg`,
        message: window.utils.getRandomElem(mockDataObj.message),
        name: window.utils.getRandomElem(mockDataObj.name)
      });
    }

    return commentsArr;
  };

  const generatePicturesDataArr = (number) => {
    const pictures = [];

    for (let i = 0; i < number; i++) {
      pictures.push({
        url: `photos/${i + 1}.jpg`,
        description: window.utils.getRandomElem(mockDataObj.description),
        likes: window.utils.getRandomInt(15, 200),
        comments: generateCommentsArr()
      });
    }

    return pictures;
  };

  window.data = {
    generateMockData: (number = PICTURES_DEFAULT_COUNT) => {
      window.picturesArr = generatePicturesDataArr(number);
    }
  };
}
