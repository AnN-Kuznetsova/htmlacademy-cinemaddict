import {FILM_CARD_EXTRA_COUNT} from "../const.js";
import {getRandomIntegerNumber} from "../utils/random.js";
import {getFieldFinder, getSortFilms} from "../sorting.js";

export default class FilmsListExtra {
  constructor(title, sortType) {
    this._title = title;
    this._sortType = sortType;
    this._selectionFieldFinder = getFieldFinder(this._sortType);
  }


  _getTopFilms(sortedFilms, topFilms = []) {
    const filmsExtraCount = FILM_CARD_EXTRA_COUNT;
    const maxElement = this._selectionFieldFinder(sortedFilms[0]);
    const filteredFilms = sortedFilms.filter((film) => (this._selectionFieldFinder(film) === maxElement));

    if ((topFilms.length + filteredFilms.length) >= filmsExtraCount) {
      while (topFilms.length < filmsExtraCount) {
        topFilms.push(...filteredFilms.splice(getRandomIntegerNumber(filmsExtraCount - filteredFilms.length), 1));
      }
    } else {
      topFilms.splice(topFilms.length, 0, ...filteredFilms.slice());
      sortedFilms.splice(0, filteredFilms.length);
      this._getTopFilms(sortedFilms, topFilms);
    }

    return topFilms;
  }

  getFilmsExtra(films) {
    const sortedFilms = getSortFilms(films, this._sortType);
    const filmsExtra = this._getTopFilms(sortedFilms);

    if (filmsExtra.length === 0 || this._selectionFieldFinder(filmsExtra[0]) === 0) {
      return 0;
    }
    return filmsExtra;
  }

  get title() {
    return this._title;
  }
}
