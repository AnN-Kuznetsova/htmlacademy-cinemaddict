const MAX_DESCRIPTION_LENGTH = 140;
const FILM_CARD_EXTRA_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const EMOJIS = {
  smile: `smile.png`,
  sleeping: `sleeping.png`,
  puke: `puke.png`,
  angry: `angry.png`,
};

const DateTimeFormat = {
  DURATION: `H[h] mm[m]`,
  DATE_SHORT: `YYYY`,
  DATE_FULL: `DD MMMM YYYY`,
  DATE_AND_TIME: `YYYY/MM/DD HH:mm`,
};

const FilterType = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};


export {
  MAX_DESCRIPTION_LENGTH,
  FILM_CARD_EXTRA_COUNT,
  SHOWING_FILMS_COUNT_ON_START,
  SHOWING_FILMS_COUNT_BY_BUTTON,
  EMOJIS,
  DateTimeFormat,
  FilterType,
};
