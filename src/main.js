import {createUserRankTemplate} from "./components/user-rank.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createFilmsBoardTemplate} from "./components/films-board.js";
import {createFilmsListTemplate} from "./components/films-list.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createFilmsListExtraTemplate} from "./components/films-list-extra.js";
import {createFilmDetailsTemplate} from "./components/film-details.js";
import {generateFilms} from "./mock/film";


const FILM_COUNT = 22;
const FILM_CARD_EXTRA_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

// const filters = generateFilters();
const films = generateFilms(FILM_COUNT);
window.console.log(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

/* const renderMultiple = (count, container, template, place) => {
  for (let i = 0; i < count; i++) {
    render(container, template, place);
  }
}; */


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createUserRankTemplate(), `beforeend`);
render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSortingTemplate(), `beforeend`);
render(siteMainElement, createFilmsBoardTemplate(), `beforeend`);

const filmsBoardElement = siteMainElement.querySelector(`.films`);

render(filmsBoardElement, createFilmsListTemplate(), `beforeend`);

const filmsListElement = filmsBoardElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
films.slice(0, showingFilmsCount)
  .forEach((film) => render(filmsListContainerElement, createFilmCardTemplate(film), `beforeend`));

render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);
const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

const onShowMoreButtonClick = () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(filmsListContainerElement, createFilmCardTemplate(film), `beforeend`));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
};

showMoreButton.addEventListener(`click`, onShowMoreButtonClick);

render(filmsBoardElement, createFilmsListExtraTemplate(`Top rated`), `beforeend`);
render(filmsBoardElement, createFilmsListExtraTemplate(`Most commented`), `beforeend`);

const filmsListExtraElements = filmsBoardElement.querySelectorAll(`.films-list--extra`);

for (let filmsListExtraElement of filmsListExtraElements) {
  const filmsListExtraContainerElement = filmsListExtraElement.querySelector(`.films-list__container`);
  //renderMultiple(FILM_CARD_EXTRA_COUNT, filmsListExtraContainerElement, createFilmCardTemplate(), `beforeend`);
}


const siteFooterElement = document.querySelector(`.footer`);
render(siteFooterElement, createFilmDetailsTemplate(films[0]), `afterend`);
window.console.log(films[0]);
const filmDetailsElement = document.querySelector(`.film-details`);
filmDetailsElement.style.display = `none`;
