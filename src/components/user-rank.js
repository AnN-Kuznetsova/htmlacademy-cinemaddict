import {filmsFilters} from "./filter.js";
import {createElement} from "../utils.js";

export class UserRank {
  constructor() {
    this._element = null;
  }

  _getUserRank(filters = filmsFilters) {
    let userRank = ``;
    const watchedFilmsCount = filters.history.filteredFilms().length;
    switch (true) {
      case ((watchedFilmsCount >= 1) && (watchedFilmsCount <= 10)):
        userRank = `Novice`;
        break;
      case ((watchedFilmsCount >= 11) && (watchedFilmsCount <= 20)):
        userRank = `Fan`;
        break;
      case (watchedFilmsCount >= 21):
        userRank = `Movie Buff`;
        break;
      default:
    }
    return userRank;
  }

  getTemplate() {
    return (
      `<section class="header__profile profile">
        <p class="profile__rating">${this._getUserRank()}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
