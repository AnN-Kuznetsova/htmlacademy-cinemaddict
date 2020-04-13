const MAX_DESCRIPTION_LENGTH = 140;
const FILM_CARD_EXTRA_COUNT = 2;

const FILTERS = {
  all: {
    value: `All movies`,
    isDefault: true,
    isNotDisplayCount: true,
  },
  watchlist: {
    value: `Watchlist`,
  },
  history: {
    value: `History`,
  },
  favorites: {
    value: `Favorites`,
  },
};

const EMOJIS = new Map([
  [`smile`, `smile.png`],
  [`sleeping`, `sleeping.png`],
  [`puke`, `puke.png`],
  [`angry`, `angry.png`],
]);


export {FILTERS, MAX_DESCRIPTION_LENGTH, FILM_CARD_EXTRA_COUNT, EMOJIS};
