import {FilterType} from "../const.js";
import {arrayDataChange} from "../utils/common.js";
import {getFilmsByFilter} from "../utils/filter";

export default class FilmsModel {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }


  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._dataChangeHandlers);
  }


  getFilmsAll() {
    return this._films;
  }


  getFilteredFilms() {
    return getFilmsByFilter(this._films, this._activeFilterType);
  }


  updateFilm(id, film) {
    const newFilms = arrayDataChange(this._films, id, film);
    this._films = newFilms.array;
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }


  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }


  getFilter() {
    return this._activeFilterType;
  }


  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }


  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }


  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
