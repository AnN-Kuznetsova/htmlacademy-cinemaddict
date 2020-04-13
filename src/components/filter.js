import {films} from "../main.js";

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
  all: {
    value: `All movies`,
    isDefault: true,
    isNotDisplayCount: true,
    filteredFilms: filterDefaultFun,
  },
  watchlist: {
    value: `Watchlist`,
    filteredFilms: filterAddToWatchlistFun,
  },
  history: {
    value: `History`,
    filteredFilms: filterHistoryFun,
  },
  favorites: {
    value: `Favorites`,
    filteredFilms: filterFavoritesFun,
  },
};

const createFilterMarkup = (filter) => {
  const [name, {value, isDefault = false, isNotDisplayCount = false, filteredFilms}] = filter;
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
