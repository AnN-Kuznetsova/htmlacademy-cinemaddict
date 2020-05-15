import AbstractComponent from "./abstract-component.js";

export default class UserRank extends AbstractComponent {
  constructor(filmsQuantity) {
    super();

    this._filmsQuantity = filmsQuantity;
  }

  _getUserRank() {
    let userRank = ``;

    switch (true) {
      case (this._filmsQuantity >= 1 && this._filmsQuantity <= 10):
        userRank = `Novice`;
        break;
      case (this._filmsQuantity >= 11 && this._filmsQuantity <= 20):
        userRank = `Fan`;
        break;
      case (this._filmsQuantity >= 21):
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
}
