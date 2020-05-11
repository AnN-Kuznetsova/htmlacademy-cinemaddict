import AbstractComponent from "./abstract-component.js";

export default class Filters extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  _createFilterMarkup(filter) {
    const {name, value, count, isChecked, isNotShowQuantity} = filter;

    return (
      `<a href="#${name.toLowerCase()}" class="main-navigation__item ${isChecked ? `main-navigation__item--active` : ``}">${value}
        ${isNotShowQuantity ? `` : `<span class="main-navigation__item-count">${count}</span>`}
      </a>`
    );
  }

  _createFiltersMarkup() {
    return this._filters
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
