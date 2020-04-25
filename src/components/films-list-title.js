import AbstractComponent from "./abstract-component.js";

export default class FilmsListTitle extends AbstractComponent {
  constructor(title, isVisually = true) {
    super();

    this._title = title;
    this._isVisually = isVisually;
  }

  getTemplate() {
    const visuallyClass = this._isVisually ? `` : `visually-hidden`;

    return (
      `<h2 class="films-list__title ${visuallyClass}">${this._title}</h2>`
    );
  }
}
