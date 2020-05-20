const MAX_DESCRIPTION_LENGTH = 140;
const FILM_CARD_EXTRA_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const SHAKE_ANIMATION_TIMEOUT = 600;

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

const Emoji = {
  smile: {
    name: `smile`,
    url: `smile.png`,
  },
  sleeping: {
    name: `sleeping`,
    url: `sleeping.png`,
  },
  puke: {
    name: `puke`,
    url: `puke.png`,
  },
  angry: {
    name: `angry`,
    url: `angry.png`,
  },
};


export {
  FILM_CARD_EXTRA_COUNT,
  MAX_DESCRIPTION_LENGTH,
  SHAKE_ANIMATION_TIMEOUT,
  SHOWING_FILMS_COUNT_ON_START,
  SHOWING_FILMS_COUNT_BY_BUTTON,
  DateTimeFormat,
  Emoji,
  FilterType,
};
