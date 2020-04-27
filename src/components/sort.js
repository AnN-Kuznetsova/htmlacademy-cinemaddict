import AbstractComponent from "./abstract-component.js";
import {SortType, getSortedFilms} from "../sorting.js";


export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return (
      `<ul class="sort">
        <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
        <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_DATE}">Sort by date</a></li>
        <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_RATING}">Sort by rating</a></li>
      </ul>`
    );
  }

  getSortType() {
    return this._currentSortType;
  }

  setOnSortTypeChange(cb) {
    const onSortTypeButtonClick = (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      cb(this._currentSortType);
    };

    this.getElement().addEventListener(`click`, onSortTypeButtonClick);
  }

  getSortedFilms(films) {
    return getSortedFilms(films, this._currentSortType);
  }
}
