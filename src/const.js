const MAX_DESCRIPTION_LENGTH = 140;

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


export {FILTERS, MAX_DESCRIPTION_LENGTH, EMOJIS};
