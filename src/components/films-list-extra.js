import {FILM_CARD_EXTRA_COUNT} from "../const.js";
import {getSortingFilms} from "./sorting.js";
import {getRandomIntegerNumber} from "../random.js";

class FilmsListExtra {
  constructor(title, selectionParameter) {
    this._title = title;
    this._selectionParameter = selectionParameter;
  }

  getFilmsExtra(films) {
    const filmsExtra = getSortingFilms(films, this._selectionParameter);

    if (filmsExtra[0][this._selectionParameter] === 0) {
      return 0;
    }
    return getTopFilms(filmsExtra, this._selectionParameter);
  }

  get title() {
    return this._title;
  }
}

const getTopFilms = (films, selectionParameter, topFilms = []) => {
  const sortingFilms = films.slice();
  const filteredFilms = sortingFilms.filter((film) => (film[selectionParameter] === sortingFilms[0][selectionParameter]));

  if ((topFilms.length + filteredFilms.length) >= FILM_CARD_EXTRA_COUNT) {
    while (topFilms.length < FILM_CARD_EXTRA_COUNT) {
      topFilms.push(...filteredFilms.splice(getRandomIntegerNumber(FILM_CARD_EXTRA_COUNT - filteredFilms.length), 1));
    }
  } else {
    topFilms.splice(topFilms.length, 0, ...filteredFilms.slice());
    sortingFilms.splice(0, filteredFilms.length);
    getTopFilms(sortingFilms, selectionParameter, topFilms);
  }

  return topFilms;
};

const filmsListsExtra = [
  new FilmsListExtra(`Top rated`, `rating`),
  new FilmsListExtra(`Most commented`, `_commentsCount`),
];

const getClassName = (title) => {
  return title.toLowerCase()
    .split(` `)
    .join(`-`);
};

const createFilmsListExtraTemplate = (title) => {
  return (
    `<section class="films-list--extra ${getClassName(title)}">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};


export {filmsListsExtra, createFilmsListExtraTemplate, getClassName};
