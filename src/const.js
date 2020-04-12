const DEFAULT_FILTER = `all`;

const MAX_DESCRIPTION_LENGTH = 140;

const FILTER = new Map([
  [`all`, `All movies`],
  [`watchlist`, `Watchlist`],
  [`history`, `History`],
  [`favorites`, `Favorites`],
]);

const EMOJI = new Map([
  [`smile`, `smile.png`],
  [`sleeping`, `sleeping.png`],
  [`puke`, `puke.png`],
  [`angry`, `angry.png`],
]);


export {DEFAULT_FILTER, FILTER, MAX_DESCRIPTION_LENGTH, EMOJI};
