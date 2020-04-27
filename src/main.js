import UserRank from "./components/user-rank.js";
import SiteMenu from "./components/site-menu.js";
import Filter from "./components/filter.js";
import Filters from "./components/filters.js";
import Sort from "./components/sort.js";
import FilmsBoard from "./components/films-board.js";
import FilmsListExtra from "./components/films-list-extra.js";
import FooterStatistics from "./components/footer-statistics.js";
import PageController from "./controllers/page-controller.js";
import {render, RenderPosition} from "./utils/render.js";
import {generateFilms} from "./mock/film";


const FILM_COUNT = 23;

const bodyElement = document.querySelector(`body`);
const siteHeaderElement = bodyElement.querySelector(`.header`);
const siteMainElement = bodyElement.querySelector(`.main`);
const siteFooterElement = bodyElement.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);


const films = generateFilms(FILM_COUNT);

const filmsFilters = {
  all: new Filter(`All movies`, `filterDefaultFun`, films, true, true),
  watchlist: new Filter(`Watchlist`, `filterAddToWatchlistFun`, films),
  history: new Filter(`History`, `filterHistoryFun`, films),
  favorites: new Filter(`Favorites`, `filterFavoritesFun`, films),
};

const filmsListsExtra = [
  new FilmsListExtra(`Top rated`, `rating`),
  new FilmsListExtra(`Most commented`, `commentsCount`),
];


const siteMenuComponent = new SiteMenu();
render(siteHeaderElement, new UserRank(filmsFilters), RenderPosition.BEFOREEND);
render(siteMainElement, siteMenuComponent, RenderPosition.BEFOREEND);
render(siteMenuComponent.getElement(), new Filters(filmsFilters), RenderPosition.AFTERBEGIN);
render(siteMainElement, new Sort(), RenderPosition.BEFOREEND);
render(footerStatisticsElement, new FooterStatistics(films.length), RenderPosition.BEFOREEND);

const filmsBoardComponent = new FilmsBoard();
const pageController = new PageController(filmsBoardComponent);

render(siteMainElement, filmsBoardComponent, RenderPosition.BEFOREEND);
pageController.render(films, filmsListsExtra);
