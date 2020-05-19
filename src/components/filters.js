import AbstractComponent from "./abstract-component.js";
import {FilterType} from "../const.js";

const FILTER_ID_PREFIX = `js-filter--`;


export default class Filters extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }


  getTemplate() {
    return (
      `<div class="main-navigation__items">
        ${this._createFiltersMarkup()}
      </div>`
    );
  }


  setFilterClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const filterName = this._getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }


  _getFilterNameById(id) {
    return FilterType[id
      .substring(FILTER_ID_PREFIX.length)
      .toUpperCase()];
  }


  _createFilterMarkup(filter) {
    const {filterName, filterValue, count, isChecked, isNotShowQuantity} = filter;

    return (
      `<a href="#${filterName.toLowerCase()}"
        id="${FILTER_ID_PREFIX + filterName.toLowerCase()}"
        class="main-navigation__item ${isChecked ? `main-navigation__item--active` : ``}"
        >${filterValue}
        ${isNotShowQuantity ? `` : `<span class="main-navigation__item-count">${count}</span>`}
      </a>`
    );
  }

  _createFiltersMarkup() {
    return this._filters
      .map((filter) => this._createFilterMarkup(filter))
      .join(`\n`);
  }
}
