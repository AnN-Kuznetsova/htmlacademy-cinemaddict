import AbstractComponent from "./abstract-component.js";

export default class FooterStatistics extends AbstractComponent {
  constructor(filmsCount) {
    super();

    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return (
      `<p>${this._filmsCount.toLocaleString(`ru-RU`)} movies inside</p>`
    );
  }
}
