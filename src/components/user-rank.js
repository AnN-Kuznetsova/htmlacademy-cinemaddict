import AbstractComponent from "./abstract-component.js";

export default class UserRank extends AbstractComponent {
  constructor(filmsQuantity) {
    super();

    this._filmsQuantity = filmsQuantity;


    this._userRank = this._setUserRank(this._filmsQuantity);
  }

  _setUserRank(filmsQuantity) {
    switch (true) {
      case ((filmsQuantity >= 1) && (filmsQuantity <= 10)):
        this._userRank = `Novice`;
        break;
      case ((filmsQuantity >= 11) && (filmsQuantity <= 20)):
        this._userRank = `Fan`;
        break;
      case (filmsQuantity >= 21):
        this._userRank = `Movie Buff`;
        break;
      default:
        this._userRank = ``;
    }
    return this._userRank;
  }

  get userRank() {
    return this._userRank;
  }

  getTemplate() {
    return (
      `<section class="header__profile profile">
        <p class="profile__rating">${this._userRank}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
    );
  }
}
