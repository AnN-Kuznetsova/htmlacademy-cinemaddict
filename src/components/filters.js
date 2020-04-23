import {AbstractComponent} from "./abstract-component.js";

export class Filters extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
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
}
