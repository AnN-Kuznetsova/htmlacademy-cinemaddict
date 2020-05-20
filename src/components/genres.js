import AbstractComponent from "./abstract-component.js";

export default class Genres extends AbstractComponent {
  constructor(genres) {
    super();

    this._genres = genres;
  }


  getTemplate() {
    return this._genres.slice().map((genre) => this._createGenreMarkup(genre)).join(`\n`);
  }


  _createGenreMarkup(genre) {
    return (
      `<span class="film-details__genre">${genre}</span>`
    );
  }
}
