import AbstractComponent from "./abstract-component.js";

export default class FilmsList extends AbstractComponent {
  constructor(isExtra = false) {
    super();

    this._isExtra = isExtra;
  }

  getTemplate() {
    const extra = this._isExtra ? `--extra` : ``;
    return (
      `<section class="films-list${extra}"></section>`
    );
  }
}
