import AbstractComponent from "./abstract-component.js";
import {formatDateFromNow, formatDate} from "../utils/common.js";
import {EMOJIS, DateTimeFormat} from "../const.js";


export default class Comments extends AbstractComponent {
  constructor(comments, newComment = null) {
    super();

    this._comments = comments;
    this._newComment = newComment;
  }

  _createNewCommentEmojiMarkup(newComment) {
    const {emojiTitle, emojiUrl} = newComment;

    return (emojiTitle && emojiUrl) ?
      `<img src="./images/emoji/${emojiUrl}" width="55" height="55" alt="emoji-${emojiTitle}">` :
      ``;
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
    //const dayAndTimeFormat = formatDateFromNow(dayAndTime);
    const dayAndTimeFormat = formatDate(dayAndTime, DateTimeFormat.DATE_AND_TIME);

    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emojiUrl}" width="55" height="55" alt="emoji-${emojiTitle}">
        </span>
        <div>
          <p class="film-details__comment-text">${text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${dayAndTimeFormat}</span>
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
    const commentsCount = this._comments.length;
    const commentsMarkup = this._createCommentsMarkup(this._comments);
    const emojiListMarkup = this._createEmojiListMarkup(EMOJIS);

    const newCommentEmojiMarkup = this._createNewCommentEmojiMarkup(this._newComment);
    const newCommentText = this._newComment.text ? this._newComment.text : ``;

    return (
      `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

        <ul class="film-details__comments-list">
          ${commentsMarkup}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label">
            ${newCommentEmojiMarkup}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newCommentText}</textarea>
          </label>

          ${emojiListMarkup}
        </div>
      </section>`
    );
  }
}
