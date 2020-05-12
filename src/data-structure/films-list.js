export default class FilmsList {
  constructor(name, title, sortType, isExtra = false) {
    this._name = name;
    this._title = title;
    this._sortType = sortType;
    this._isExtra = isExtra;
  }

  get name() {
    return this._name;
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
