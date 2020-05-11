import AbstractComponent from "./abstract-component.js";

const FILTER_ID_PREFIX = `js-filter--`;


export default class Filters extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }


  _getFilterNameById(id) {
    return id.substring(FILTER_ID_PREFIX.length)
      .toUpperCase();
  }


  _createFilterMarkup(filter) {
    const {name, value, count, isChecked, isNotShowQuantity} = filter;

    return (
      `<a href="#${name.toLowerCase()}"
        id="${FILTER_ID_PREFIX + name.toLowerCase()}"
        class="main-navigation__item ${isChecked ? `main-navigation__item--active` : ``}"
        >${value}
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

  setOnFilterClick(cb) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const filterName = this._getFilterNameById(evt.target.id);
      cb(filterName);
    });
  }
}
