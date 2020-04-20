import {createElement} from "../utils.js";

export class Genres {
  constructor(genres) {
    this._genres = genres;
    this._element = null;
  }

  _createGenreMarkup(genre) {
    return (
      `<span class="film-details__genre">${genre}</span>`
    );
  }

  getTemplate() {
    return this._genres.slice().map((it) => this._createGenreMarkup(it)).join(`\n`);
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
