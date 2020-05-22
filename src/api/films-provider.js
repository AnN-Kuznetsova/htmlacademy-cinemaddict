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

    const storeFilms = Object.values(this._store.getItems())
      .map((item) => item.movie);

    return Promise.resolve(FilmModel.parseFilms(storeFilms));
  }


  updateFilm(id, film) {
    if (isOnline()) {
      return this._api.updateFilm(id, film)
      .then((newFilm) => {
        this._store.setItem(newFilm.id, this._createItemStructure(newFilm.toRAW()));

        return newFilm;
      });
    }

    const localFilm = FilmModel.clone(Object.assign(film, {id}));

    this._store.setItem(id, this._createItemStructure(localFilm.toRAW(), true));
    this._isNeedSync = true;

    return Promise.resolve(localFilm);
  }


  sync() {
    if (isOnline()) {
      const storeFilmsNeedingSync = Object.values(this._store.getItems())
        .filter((item) => item.isNeedSync)
        .map((item) => item.movie);

      return this._api.sync(storeFilmsNeedingSync)
        .then((response) => {
          const updatedFilms = response.updated;

          updatedFilms.forEach((updatedFilm) => {
            this._store.setItem(updatedFilm.id, this._createItemStructure(updatedFilm));
          });

          this._isNeedSync = false;
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }


  _createStoreStructure(items, isNeedSync = false) {
    return items.reduce((acc, currentItem) => {
      return Object.assign({}, acc, {
        [currentItem.id]: this._createItemStructure(currentItem, isNeedSync),
      });
    }, {});
  }


  _createItemStructure(item, isNeedSync = false) {
    return {
      isNeedSync,
      movie: item,
    };
  }
}
