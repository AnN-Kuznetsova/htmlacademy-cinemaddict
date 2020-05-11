import {arrayDataChange} from "../utils/common.js";
import {FilterType} from "../const.js";

export default class FilmsModel {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }


  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }


  getFilmsAll() {
    return this._films;
  }


  getFilteredFilms() {
    //return getFilmsByFilter(this._films, this._activeFilterType);
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


  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }


  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }


  getFilter() {
    return this._activeFilterType;
  }
}
