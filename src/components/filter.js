export class Filter {
  constructor(value, /* filteredFilms */ functionName, films, isDefault = false, isNotDisplayCount = false) {
    this._value = value;
    this._isDefault = isDefault;
    this._isNotDisplayCount = isNotDisplayCount;
    this._functionName = `_${functionName}`;
    this._filteredFilms = this[this._functionName](films); // filteredFilms;
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

  get filteredFilms() {
    return this._filteredFilms;
  }
}
