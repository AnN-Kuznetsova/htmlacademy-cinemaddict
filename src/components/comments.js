import {formatDateWithSlash, formatTime, createElement} from "../utils.js";
import {EMOJIS} from "../const.js";

export class Comments {
  constructor(comments) {
    this._comments = comments;
    this._element = null;
  }

  _createEmojiListMarkup(emojis) {
    return (
      `<div class="film-details__emoji-list">
        ${Object.entries(emojis)
            .map(([emojiTitle, emojiUrl]) => {
              return (
                `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emojiTitle}" value="${emojiTitle}">
                <label class="film-details__emoji-label" for="emoji-${emojiTitle}">
                  <img src="./images/emoji/${emojiUrl}" width="30" height="30" alt="emoji">
                </label>`
              );
            })
            .join(`\n`)}
      </div>`
    );
  }

  _createCommentMarkup(comment) {
    const {text, emoji, author, dayAndTime} = comment;
    const [emojiTitle, emojiUrl] = emoji;

    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emojiUrl}" width="55" height="55" alt="emoji-${emojiTitle}">
        </span>
        <div>
          <p class="film-details__comment-text">${text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${formatDateWithSlash(dayAndTime)} ${formatTime(dayAndTime)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    );
  }

  _createCommentsMarkup(comments) {
    return comments.slice().map((it) => this._createCommentMarkup(it)).join(`\n`);
  }

  getTemplate() {
    return (
      `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${this._createCommentsMarkup(this._comments)}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          ${this._createEmojiListMarkup(EMOJIS)}
        </div>
      </section>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
