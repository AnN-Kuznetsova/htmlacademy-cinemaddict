export default class FilmsProvider {
  constructor(api) {
    this._api = api;
  }


  getFilms() {
    return this._api.getFilms();
  }


  updateFilm(id, film) {
    return this._api.updateFilm(id, film);
  }
}
