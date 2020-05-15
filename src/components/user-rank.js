import AbstractSmartComponent from "./abstract-smart-component.js";
import {getHistoryFilms} from "../utils/filter.js";
import {getUserRank} from "../utils/user-rank.js";

export default class UserRank extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;

    this._filmsQuantity = null;
    this._userRank = null;

    this._setFilmsQuantity = this._setFilmsQuantity.bind(this);

    this._filmsModel.setDataChangeHandler(this._setFilmsQuantity);

    this._setFilmsQuantity();
  }

  _setFilmsQuantity() {
    const filmsQuantity = getHistoryFilms(this._filmsModel.getFilmsAll()).length;

    if (this._filmsQuantity !== filmsQuantity) {
      this._filmsQuantity = filmsQuantity;

      this._setUserRank();
    }
  }

  _setUserRank() {
    const userRank = getUserRank(this._filmsQuantity);

    if (this._userRank !== userRank) {
      this._userRank = userRank;

      this.rerender();
    }
  };

  getTemplate() {
    return (
      `<section class="header__profile profile">
        <p class="profile__rating">${this._userRank}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
    );
  }

  recoveryListeners() {}
}
