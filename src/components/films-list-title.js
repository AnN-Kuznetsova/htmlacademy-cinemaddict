import {createElement} from "../utils.js";

export class FilmsListTitle {
  constructor(title, isVisually = true) {
    this._title = title;
    this._isVisually = isVisually;
    this._element = null;
  }

  getTemplate() {
    const visuallyClass = this._isVisually ? `` : `visually-hidden`;

    return (
      `<h2 class="films-list__title ${visuallyClass}">${this._title}</h2>`
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
