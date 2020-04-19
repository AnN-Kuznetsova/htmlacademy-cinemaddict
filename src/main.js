import {UserRank} from "./components/user-rank.js";
import {SiteMenu} from "./components/site-menu.js";
import {Filter} from "./components/filter.js";
import {Filters} from "./components/filters.js";
import {Sort} from "./components/sort.js";
import {FilmsBoard} from "./components/films-board.js";
import {FilmsList} from "./components/films-list.js";
import {FilmCard} from "./components/film-card.js";
import {ShowMoreButton} from "./components/show-more-button.js";
import {FilmsListExtra} from "./components/films-list-extra.js";
import {FooterStatistics} from "./components/footer-statistics.js";
import {FilmDetails} from "./components/film-details.js";
import {NoData} from "./components/no-data.js";
import {render, RenderPosition} from "./utils.js";
import {generateFilms} from "./mock/film";


const FILM_COUNT = 13;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);


const films = generateFilms(FILM_COUNT);

const filmsFilters = {
  all: new Filter(`All movies`, `filterDefaultFun`, films, true, true),
  watchlist: new Filter(`Watchlist`, `filterAddToWatchlistFun`, films),
  history: new Filter(`History`, `filterHistoryFun`, films),
  favorites: new Filter(`Favorites`, `filterFavoritesFun`, films),
};
window.console.log(filmsFilters);

const filmsListsExtra = [
  new FilmsListExtra(`Top rated`, `rating`),
  new FilmsListExtra(`Most commented`, `commentsCount`),
];

const siteMenuComponent = new SiteMenu();

render(siteHeaderElement, new UserRank(filmsFilters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, siteMenuComponent.getElement(), RenderPosition.BEFOREEND);
render(siteMenuComponent.getElement(), new Filters(filmsFilters).getElement(), RenderPosition.AFTERBEGIN);
render(siteMainElement, new Sort().getElement(), RenderPosition.BEFOREEND);
render(footerStatisticsElement, new FooterStatistics(films.length).getElement(), RenderPosition.BEFOREEND);


const filmsBoardComponent = new FilmsBoard();
render(siteMainElement, filmsBoardComponent.getElement(), RenderPosition.BEFOREEND);

/*

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
    render(filmsBoardElement, createFilmsListExtraTemplate(list.title), `beforeend`);
    const filmListExtraElement = filmsBoardElement.querySelector(`.${getClassName(list.title)}`);
    const filmsListExtraContainerElement = filmListExtraElement.querySelector(`.films-list__container`);
    const filmsExtra = list.getFilmsExtra(films);
    if (filmsExtra === 0) {
      filmListExtraElement.remove();
    } else {
      for (const film of filmsExtra) {
        render(filmsListExtraContainerElement, createFilmCardTemplate(film), `beforeend`);
      }
    }
  }

  render(siteFooterElement, createFilmDetailsTemplate(films[0]), `afterend`);
  const filmDetailsElement = document.querySelector(`.film-details`);
  filmDetailsElement.style.display = `none`;
} else {
  const filmsListTitleElement = filmsListElement.querySelector(`.films-list__title`);
  noData(filmsListTitleElement);
}
 */


