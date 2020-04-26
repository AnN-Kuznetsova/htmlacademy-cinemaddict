import Filter from "./components/filter.js";
//import FilmsListExtra from "./components/films-list-extra.js";
import PageController from "./controllers/page-controller.js";
import {generateFilms} from "./mock/film";


const FILM_COUNT = 12;


const films = generateFilms(FILM_COUNT);

const filmsFilters = {
  all: new Filter(`All movies`, `filterDefaultFun`, films, true, true),
  watchlist: new Filter(`Watchlist`, `filterAddToWatchlistFun`, films),
  history: new Filter(`History`, `filterHistoryFun`, films),
  favorites: new Filter(`Favorites`, `filterFavoritesFun`, films),
};

/* const filmsListsExtra = [
  new FilmsListExtra(`Top rated`, `rating`),
  new FilmsListExtra(`Most commented`, `commentsCount`),
]; */


const pageController = new PageController(films, filmsFilters/* , filmsListsExtra */);
pageController.render();
