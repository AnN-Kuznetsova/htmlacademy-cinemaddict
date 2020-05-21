import {isOnline} from "../utils/common.js";


export default class FilmsProvider {
  constructor(api) {
    this._api = api;
  }


  getFilms() {
    if (isOnline()) {
      return this._api.getFilms();
    }

    // TODO: Реализовать логику при отсутствии интернета
    return Promise.reject(`offline logic is not implemented`);
  }


  updateFilm(id, film) {
    if (isOnline()) {
      return this._api.updateFilm(id, film);
    }

    // TODO: Реализовать логику при отсутствии интернета
    return Promise.reject(`offline logic is not implemented`);
  }
}
