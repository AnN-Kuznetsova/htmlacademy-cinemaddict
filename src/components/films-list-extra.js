import {FILM_CARD_EXTRA_COUNT} from "../const.js";
import {getSortingFilms} from "./sorting.js";

class FilmsListExtra {
  constructor(title, selectionParameter) {
    this._title = title;
    this._selectionParameter = selectionParameter;
  }

  getFilmsExtra(films) {
    return getSortingFilms(films, this._selectionParameter)
    .splice(0, FILM_CARD_EXTRA_COUNT);
  }

  get title() {
    return this._title;
  }
}

const filmsListsExtra = [
  new FilmsListExtra(`Top rated`, `rating`),
  new FilmsListExtra(`Most commented`, `comments`),
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
