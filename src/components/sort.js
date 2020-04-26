import AbstractComponent from "./abstract-component.js";

const SortType = {
  DEFAULT: `default`,
  BY_DATE: `by-date`,
  BY_RATING: `by-rating`,
};

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
    const sortType = this._currentSortType;
    let sortedTasks = [];

    switch (sortType) {
      case SortType.BY_DATE:
        sortedTasks = this.sortDescending(films, `releaseDate`);
        break;
      case SortType.BY_RATING:
        sortedTasks = this.sortDescending(films, `rating`);
        break;
      case SortType.DEFAULT:
        sortedTasks = films;
        break;
      default:
        sortedTasks = films;
    }

    return sortedTasks;
  }

  sortDescending(films, selectionParameter) {
    return films.slice()
    .sort((left, right) => (right[selectionParameter] - left[selectionParameter]));
  }
}
