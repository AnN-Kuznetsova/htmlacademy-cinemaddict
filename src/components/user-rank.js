import AbstractComponent from "./abstract-component.js";
import {getUserRank} from "../utils/user-rank.js";

export default class UserRank extends AbstractComponent {
  constructor(filmsQuantity) {
    super();

    this._filmsQuantity = filmsQuantity;
  }


  getTemplate() {
    const userRank = getUserRank(this._filmsQuantity);
    return (
      `<section class="header__profile profile">
        <p class="profile__rating">${userRank}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
    );
  }
}
