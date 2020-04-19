import {createElement} from "../utils.js";

/* export const noData = (filmsListTitleElement) => {
  filmsListTitleElement.textContent = `There are no movies in our database`;
  filmsListTitleElement.classList.remove(`visually-hidden`);
}; */

export class NoData {
  constructor(filmsListTitleElement) {
    this._filmsListTitleElement = filmsListTitleElement;
    this._element = null;
  }

  setNoData() {
    this._filmsListTitleElement.textContent = `There are no movies in our database`;
    this._filmsListTitleElement.classList.remove(`visually-hidden`);
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
