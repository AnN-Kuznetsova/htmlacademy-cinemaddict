import {FILM_CARD_EXTRA_COUNT} from "../const.js";
import {getRandomIntegerNumber} from "../utils/random.js";
import {getSortDescending} from "../utils/common.js";

export default class FilmsListExtra {
  constructor(title, selectionParameter) {
    this._title = title;
    this._selectionParameter = selectionParameter;
    this._element = null;
  }

  _getTopFilms(films, selectionParameter, topFilms = []) {
    const filmsExtraCount = FILM_CARD_EXTRA_COUNT;
    const sortingFilms = films.slice();
    const filteredFilms = sortingFilms.filter((film) => (film[selectionParameter] === sortingFilms[0][selectionParameter]));

    if ((topFilms.length + filteredFilms.length) >= filmsExtraCount) {
      while (topFilms.length < filmsExtraCount) {
        topFilms.push(...filteredFilms.splice(getRandomIntegerNumber(filmsExtraCount - filteredFilms.length), 1));
      }
    } else {
      topFilms.splice(topFilms.length, 0, ...filteredFilms.slice());
      sortingFilms.splice(0, filteredFilms.length);
      this._getTopFilms(sortingFilms, selectionParameter, topFilms);
    }

    return topFilms;
  }

  getFilmsExtra(films) {
    const filmsSorting = getSortDescending(films, this._selectionParameter);
    const filmsExtra = this._getTopFilms(filmsSorting, this._selectionParameter);

    if (filmsExtra.length === 0 || filmsExtra[0][this._selectionParameter] === 0) {
      return 0;
    }
    return filmsExtra;
  }

  get title() {
    return this._title;
  }
}
