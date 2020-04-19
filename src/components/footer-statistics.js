import {createElement} from "../utils.js";

export const createFooterStatisticsTemplate = (filmsCount) => {
  return (
    `<p>${filmsCount.toLocaleString(`ru-RU`)} movies inside</p>`
  );
};


export class FooterStatistics {
  constructor(filmsCount) {
    this._filmsCount = filmsCount;
    this._element = null;
  }

  getTemplate() {
    return (
      `<p>${this._filmsCount.toLocaleString(`ru-RU`)} movies inside</p>`
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
