import FilmModel from "../models/film-model.js";
import {isOnline} from "../utils/common.js";


export default class FilmsProvider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }


  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          films.forEach((film) => this._store.setItem(film.id, film.toRAW()));

          return films;
        });
    }

    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(FilmModel.parseFilms(storeFilms));
  }


  updateFilm(id, film) {
    if (isOnline()) {
      return this._api.updateFilm(id, film);
    }

    // TODO: Реализовать логику при отсутствии интернета
    return Promise.reject(`offline logic is not implemented`);
  }
}
