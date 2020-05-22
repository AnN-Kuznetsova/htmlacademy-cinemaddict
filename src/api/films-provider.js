import FilmModel from "../models/film-model.js";
import {isOnline} from "../utils/common.js";


export default class FilmsProvider {
  constructor(api, store) {
    this._api = api;
    this._store = store;

    this._isNeedSync = false;
  }


  get isNeedSync() {
    return this._isNeedSync;
  }


  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = this._createStoreStructure(films.map((film) => film.toRAW()));

          this._store.setItems(items);

          return films;
        });
    }

    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(FilmModel.parseFilms(storeFilms));
  }


  updateFilm(id, film) {
    if (isOnline()) {
      return this._api.updateFilm(id, film)
      .then((newFilm) => {
        this._store.setItem(newFilm.id, newFilm.toRAW());

        return newFilm;
      });
    }

    const localFilm = FilmModel.clone(Object.assign(film, {id}));

    this._store.setItem(id, localFilm.toRAW());
    this._isNeedSync = true;

    return Promise.resolve(localFilm);
  }


  sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      return this._api.sync(storeFilms)
        .then((response) => {
          //window.console.log(response);
          const updatedFilms = response.updated;
          const items = this._createStoreStructure(updatedFilms);

          this._store.setItems(items);
          this._isNeedSync = false;
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }


  _createStoreStructure(items) {
    return items.reduce((acc, currentItem) => {
      return Object.assign({}, acc, {
        [currentItem.id]: currentItem,
      });
    }, {});
  }
}
