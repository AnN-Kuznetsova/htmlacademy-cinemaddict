import {createElement} from "../utils.js";

export class FilmsList {
  constructor(isExtra = false) {
    this._isExtra = isExtra;
    this._element = null;
  }

  getTemplate() {
    const extra = this._isExtra ? `--extra` : ``;
    return (
      `<section class="films-list${extra}"></section>`
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
