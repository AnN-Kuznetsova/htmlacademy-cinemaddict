import {FILTERS} from "../const.js";

const getFilteredFilmsCount = (films, filters = FILTERS) => {
  for (const filter in filters) {
    if (filters.hasOwnProperty(filter)) {
      filters[filter].filmsCount = 0;
    }
  }

  films.forEach((film) => {
    if (film.isAddToWatchlist) {
      filters.watchlist.filmsCount++;
    }
    if (film.isMarkAsWatched) {
      filters.history.filmsCount++;
    }
    if (film.isFavorite) {
      filters.favorites.filmsCount++;
    }
  });
};

const createFilterMarkup = (filter) => {
  const [name, {value, isDefault = false, isNotDisplayCount = false, filmsCount}] = filter;
  return (
    `<a href="#${name}" class="main-navigation__item ${isDefault ? `main-navigation__item--active` : ``}">${value}
      ${isNotDisplayCount ? `` : `<span class="main-navigation__item-count">${filmsCount}</span>`}
    </a>`
  );
};

const createFiltersMarkup = (filters = FILTERS) => {
  return Object.entries(filters)
    .map((filter) => createFilterMarkup(filter))
    .join(`\n`);
};


export {getFilteredFilmsCount, createFiltersMarkup};
