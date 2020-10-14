'use strict';

{
  const DEFAULT_COMMENTS_COUNT = 5;
  const commentsCountNode = document.querySelector(`.social__comment-count`);
  const commentsLoadButtonNode = document.querySelector(`.comments-loader`);
  const commentsContainerNode = document.querySelector(`.social__comments`);
  const commentTemplateNode = document.querySelector(`.social__comment`).cloneNode(true);
  let commentsObj;

  class Comments {
    constructor(commentsArr) {
      this._arr = commentsArr;
      this._length = commentsArr.length;
      this._startCount = 0;
      this._endCount = 0;
      this._stringName = this._length === 1 ? `комментария` : `комментариев`;
      this.isMax = false;
    }

    get currentString() {
      return this.isMax ? null : `${this._endCount} из <span class="comments-count">${this._length}</span> ${this._stringName}`;
    }

    get currentSlice() {
      return this.isMax ? null : this._arr.slice(this._startCount, this._endCount);
    }

    isLastStep() {
      return this._endCount === this._length;
    }

    increaseCount() {
      if (!this.isMax) {
        const newCount = this._endCount + DEFAULT_COMMENTS_COUNT > this._length ? this._length : this._endCount + DEFAULT_COMMENTS_COUNT;
        this._startCount = this._endCount;
        this._endCount = newCount;

        if (this._startCount === this._length) {
          this.isMax = true;
        }
      }

      return this.isMax ? true : false;
    }
  }

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

  const addComments = () => {
    if (!commentsObj.increaseCount()) {
      commentsCountNode.innerHTML = commentsObj.currentString;
      const fragment = getHtmlCommentsFragment(commentsObj.currentSlice);
      commentsContainerNode.appendChild(fragment);

      if (commentsObj.isLastStep()) {
        commentsLoadButtonNode.classList.add(`hidden`);
      }
    }
  };

  const setComments = (commentsArr) => {
    commentsObj = new Comments(commentsArr);

    commentsLoadButtonNode.classList.remove(`hidden`);
    commentsContainerNode.textContent = ``;
    addComments();
  };

  commentsLoadButtonNode.addEventListener(`click`, addComments);

  window.comments = {
    set: setComments
  };
}
