import {films} from "../main.js";

class FilmsFilter {
  constructor(value, filteredFilms, isDefault = false, isNotDisplayCount = false) {
    this.value = value;
    this.isDefault = isDefault;
    this.isNotDisplayCount = isNotDisplayCount;
    this.filteredFilms = filteredFilms;
  }
}

const filterDefaultFun = (filmsArray = films) => {
  return filmsArray;
};

const filterAddToWatchlistFun = (filmsArray = films) => {
  return filmsArray.filter((film) => film.isAddToWatchlist);
};

const filterHistoryFun = (filmsArray = films) => {
  return filmsArray.filter((film) => film.isMarkAsWatched);
};

const filterFavoritesFun = (filmsArray = films) => {
  return filmsArray.filter((film) => film.isFavorite);
};

const filmsFilters = {
  all: new FilmsFilter(`All movies`, filterDefaultFun, true, true),
  watchlist: new FilmsFilter(`Watchlist`, filterAddToWatchlistFun),
  history: new FilmsFilter(`History`, filterHistoryFun),
  favorites: new FilmsFilter(`Favorites`, filterFavoritesFun),
};

const createFilterMarkup = (filter) => {
  const [name, {value, isDefault, isNotDisplayCount, filteredFilms}] = filter;
  return (
    `<a href="#${name}" class="main-navigation__item ${isDefault ? `main-navigation__item--active` : ``}">${value}
      ${isNotDisplayCount ? `` : `<span class="main-navigation__item-count">${filteredFilms().length}</span>`}
    </a>`
  );
};

const createFiltersMarkup = (filters = filmsFilters) => {
  return Object.entries(filters)
    .map((filter) => createFilterMarkup(filter))
    .join(`\n`);
};


export {filmsFilters, createFiltersMarkup};
