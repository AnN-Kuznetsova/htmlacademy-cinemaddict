import Filter from "./components/filter.js";
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


const pageController = new PageController(films, filmsFilters);
pageController.render();
