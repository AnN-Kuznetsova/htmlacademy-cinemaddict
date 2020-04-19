import {createElement} from "../utils.js";

export class FilmsListTitle {
  constructor(filmsCount) {
    this._filmsCount = filmsCount;
    this._element = null;
  }

  getTemplate() {
    return this._filmsCount ? (`<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`) :
      (`<h2 class="films-list__title">There are no movies in our database</h2>`);
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
