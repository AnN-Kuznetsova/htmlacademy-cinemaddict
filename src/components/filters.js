import AbstractComponent from "./abstract-component.js";

export default class Filters extends AbstractComponent {
  constructor(filters, films) {
    super();

    this._filters = filters;
    this._films = films;
  }

  _createFilterMarkup(filter) {
    const [name, filterOptions] = filter;
    const {value, isDefault, isNotDisplayCount} = filterOptions;
    const filteredFilmsLength = filterOptions.getFilteredFilms(this._films).length;

    return (
      `<a href="#${name}" class="main-navigation__item ${isDefault ? `main-navigation__item--active` : ``}">${value}
        ${isNotDisplayCount ? `` : `<span class="main-navigation__item-count">${filteredFilmsLength}</span>`}
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
}
