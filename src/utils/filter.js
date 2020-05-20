import {FilterType} from "../const.js";


const getAddToWatchlistFilms = (films) => {
  return films.filter((film) => film.isAddToWatchlist);
};


const getHistoryFilms = (films) => {
  return films.filter((film) => film.isMarkAsWatched);
};


const getFavoritesFilms = (films) => {
  return films.filter((film) => film.isFavorite);
};


const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.WATCHLIST:
      return getAddToWatchlistFilms(films);
    case FilterType.HISTORY:
      return getHistoryFilms(films);
    case FilterType.FAVORITES:
      return getFavoritesFilms(films);
    case FilterType.ALL:
    default:
      return films;
  }
};


export {
  getFilmsByFilter,
};
