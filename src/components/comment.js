import AbstractComponent from "./abstract-component.js";
import {formatDateFromNow} from "../utils/common.js";


export default class Comment extends AbstractComponent {
  constructor(comment) {
    super();

    this._comment = comment;
  }


  getTemplate() {
    const comment = this._comment;
    const {text, emoji, author, dayAndTime} = comment;
    const [emojiTitle, emojiUrl] = emoji;
    const dayAndTimeFormat = formatDateFromNow(dayAndTime);

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
            <button type="button" class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    );
  }


  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-delete`)
      .addEventListener(`click`, handler);
  }
}
