import {arrayDataChange} from "../utils/common.js";

export default class FilmsModel {
  constructor() {
    this._films = [];

    this._dataChangeHandlers = [];
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  getFilms() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._dataChangeHandlers);
  }

  updateFilm(id, film) {
    const newFilms = arrayDataChange(this._films, id, film);
    this._films = newFilms.array;
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

}
