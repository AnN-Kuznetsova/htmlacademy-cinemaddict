import {createElement} from "../utils.js";

export class Filters {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  _createFilterMarkup(filter) {
    const [name, {value, isDefault, isNotDisplayCount, filteredFilms}] = filter;
    return (
      `<a href="#${name}" class="main-navigation__item ${isDefault ? `main-navigation__item--active` : ``}">${value}
        ${isNotDisplayCount ? `` : `<span class="main-navigation__item-count">${filteredFilms.length}</span>`}
      </a>`
    );
  }

  _createFiltersMarkup() {
    return Object.entries(this._filters)
      .map((filter) => this._createFilterMarkup(filter))
      .join(`\n`);
  }

  getTemplate() {
    return (
      `<div class="main-navigation__items">
        ${this._createFiltersMarkup()}
      </div>`
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
