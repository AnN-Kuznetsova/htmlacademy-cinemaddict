export default class FilmsList {
  constructor(title, sortType, isExtra = false) {
    this._title = title;
    this._sortType = sortType;
    this._isExtra = isExtra;
  }

  get title() {
    return this._title;
  }

  get sortType() {
    return this._sortType;
  }

  get isExtra() {
    return this._isExtra;
  }
}
