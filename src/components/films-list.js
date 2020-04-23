import {AbstractComponent} from "./abstract-component.js";

export class FilmsList extends AbstractComponent {
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
