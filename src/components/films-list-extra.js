import {FILM_CARD_EXTRA_COUNT} from "../const.js";
import {Sort} from "./sort.js";
import {getRandomIntegerNumber} from "../random.js";
import {createElement} from "../utils.js";

export class FilmsListExtra {
  constructor(title, selectionParameter) {
    this._title = title;
    this._selectionParameter = selectionParameter;
    this._element = null;
  }

  /* const filmsListsExtra = [
    new FilmsListExtra(`Top rated`, `rating`),
    new FilmsListExtra(`Most commented`, `commentsCount`),
  ]; */


  _getTopFilms(films, selectionParameter, topFilms = []) {
    const sortingFilms = films.slice();
    const filteredFilms = sortingFilms.filter((film) => (film[selectionParameter] === sortingFilms[0][selectionParameter]));

    if ((topFilms.length + filteredFilms.length) >= FILM_CARD_EXTRA_COUNT) {
      while (topFilms.length < FILM_CARD_EXTRA_COUNT) {
        topFilms.push(...filteredFilms.splice(getRandomIntegerNumber(FILM_CARD_EXTRA_COUNT - filteredFilms.length), 1));
      }
    } else {
      topFilms.splice(topFilms.length, 0, ...filteredFilms.slice());
      sortingFilms.splice(0, filteredFilms.length);
      this._getTopFilms(sortingFilms, selectionParameter, topFilms);
    }

    return topFilms;
  }

  getFilmsExtra(films) {
    const filmsExtra = Sort.getSortingFilms(films, this._selectionParameter);

    if (filmsExtra[0][this._selectionParameter] === 0) {
      return 0;
    }
    return this._getTopFilms(filmsExtra, this._selectionParameter);
  }

  get title() {
    return this._title;
  }

  getClassName(title) {
    return title.toLowerCase()
      .split(` `)
      .join(`-`);
  }

  getTemplate(title) {
    return (
      `<section class="films-list--extra ${this._getClassName(title)}">
        <h2 class="films-list__title">${title}</h2>
        <div class="films-list__container"></div>
      </section>`
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
