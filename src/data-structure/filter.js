export default class Filter {
  constructor(value, functionName, isDefault = false, isNotDisplayCount = false) {
    this._value = value;
    this._isDefault = isDefault;
    this._isNotDisplayCount = isNotDisplayCount;
    this._functionName = `_${functionName}`;
  }

  _filterDefaultFun(films) {
    return films;
  }

  _filterAddToWatchlistFun(films) {
    return films.filter((film) => film.isAddToWatchlist);
  }

  _filterHistoryFun(films) {
    return films.filter((film) => film.isMarkAsWatched);
  }

  _filterFavoritesFun(films) {
    return films.filter((film) => film.isFavorite);
  }

  get value() {
    return this._value;
  }

  get isDefault() {
    return this._isDefault;
  }

  get isNotDisplayCount() {
    return this._isNotDisplayCount;
  }

  get functionName() {
    return this._functionName;
  }

  getFilteredFilms(films) {
    return this[this._functionName](films);
  }
}
