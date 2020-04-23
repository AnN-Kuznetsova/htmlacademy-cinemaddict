import {AbstractComponent} from "./abstract-component.js";

export class Genres extends AbstractComponent {
  constructor(genres) {
    super();

    this._genres = genres;
  }

  _createGenreMarkup(genre) {
    return (
      `<span class="film-details__genre">${genre}</span>`
    );
  }

  getTemplate() {
    return this._genres.slice().map((it) => this._createGenreMarkup(it)).join(`\n`);
  }
}
