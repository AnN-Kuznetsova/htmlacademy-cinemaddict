import {createUserRankTemplate} from "./components/user-rank.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createFilmsBoardTemplate} from "./components/films-board.js";
import {createFilmsListTemplate} from "./components/films-list.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createFilmsListExtraTemplate, filmsListsExtra, getClassName} from "./components/films-list-extra.js";
import {createFooterStatisticsTemplate} from "./components/footer-statistics.js";
import {createFilmDetailsTemplate} from "./components/film-details.js";
import {noData} from "./components/no-data.js";
import {generateFilms} from "./mock/film";


const FILM_COUNT = 5;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;


const films = generateFilms(FILM_COUNT);
// window.console.log(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, createUserRankTemplate(), `beforeend`);
render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSortingTemplate(), `beforeend`);
render(siteMainElement, createFilmsBoardTemplate(), `beforeend`);
render(footerStatisticsElement, createFooterStatisticsTemplate(films.length), `beforeend`);

const filmsBoardElement = siteMainElement.querySelector(`.films`);
render(filmsBoardElement, createFilmsListTemplate(), `beforeend`);

const filmsListElement = filmsBoardElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

if (films.length > 0) {
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
  films.slice(0, showingFilmsCount)
    .forEach((film) => render(filmsListContainerElement, createFilmCardTemplate(film), `beforeend`));

  if (films.length > SHOWING_FILMS_COUNT_ON_START) {
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
  }

  for (const list of filmsListsExtra) {
    //const

    render(filmsBoardElement, createFilmsListExtraTemplate(list.title), `beforeend`);
    const filmListExtraElement = filmsBoardElement.querySelector(`.${getClassName(list.title)}`);
    const filmsListExtraContainerElement = filmListExtraElement.querySelector(`.films-list__container`);
    const filmsExtra = list.getFilmsExtra(films);
    if (filmsExtra === 0) {
      window.console.log(`no movies`);
    } else {
      for (const film of filmsExtra) {
        render(filmsListExtraContainerElement, createFilmCardTemplate(film), `beforeend`);
      }
    }
  }

  render(siteFooterElement, createFilmDetailsTemplate(films[0]), `afterend`);
  // window.console.log(films[0]);
  const filmDetailsElement = document.querySelector(`.film-details`);
  filmDetailsElement.style.display = `none`;
} else {
  noData();
}


export {films};
