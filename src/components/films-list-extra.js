import {FILM_CARD_EXTRA_COUNT} from "../const.js";

const FILMS_LISTS_EXTRA = [
  {
    title: `Top rated`,
    parametr: `rating`,
  },
  {
    title: `Most commented`,
    parametr: `comments`,
  }
];

const getTopFilms = (films, parametr) => {
  return films.slice()
    .sort((left, right) =>
      (parametr === `comments`) ? (right.comments.length - left.comments.length) : (right[parametr] - left[parametr]))
    .splice(0, FILM_CARD_EXTRA_COUNT);
};

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


export {FILMS_LISTS_EXTRA, createFilmsListExtraTemplate, getClassName, getTopFilms};
