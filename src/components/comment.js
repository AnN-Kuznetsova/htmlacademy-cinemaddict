import AbstractComponent from "./abstract-component.js";
import {disableForm, formatDateFromNow} from "../utils/common.js";


const DefaultDeleteButtonTextData = {
  deleteButtonText: `Delete`,
};


export default class Comment extends AbstractComponent {
  constructor(comment) {
    super();

    this._comment = comment;

    this._deleteButton = null;
    this._deleteButtonClickHandler = null;
    this._externalData = DefaultDeleteButtonTextData;
  }


  get deleteButton() {
    if (!this._deleteButton) {
      this._deleteButton = this.getElement().querySelector(`.film-details__comment-delete`);
    }

    return this._deleteButton;
  }


  getTemplate() {
    const comment = this._comment;
    const {emoji, author, dayAndTime} = comment;
    const text = comment.text ? comment.text : ``;
    const {name: emojiTitle, url: emojiUrl} = emoji;
    const dayAndTimeFormat = formatDateFromNow(dayAndTime);

    const deleteButtonText = this._externalData.deleteButtonText;

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
            <button type="button" class="film-details__comment-delete">${deleteButtonText}</button>
          </p>
        </div>
      </li>`
    );
  }


  setDeleteButtonTextData(data) {
    this._externalData = Object.assign({}, DefaultDeleteButtonTextData, data);
    this.deleteButton.textContent = this._externalData.deleteButtonText;
  }


  setDeleteButtonDisable(isDisabled = true) {
    if (isDisabled) {
      disableForm([this.deleteButton]);
    } else {
      disableForm([this.deleteButton], false);
    }
  }


  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-delete`)
      .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }
}
