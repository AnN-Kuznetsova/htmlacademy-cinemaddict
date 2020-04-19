import {createElement} from "../utils.js";

export class Sort {
  constructor() {
    this._element = null;
  }

  getSortingFilms(films, selectionParameter) {
    return films.slice()
    .sort((left, right) => (right[selectionParameter] - left[selectionParameter]));
  }

  getTemplate() {
    return (
      `<ul class="sort">
        <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" class="sort__button">Sort by date</a></li>
        <li><a href="#" class="sort__button">Sort by rating</a></li>
      </ul>`
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
