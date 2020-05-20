import AbstractComponent from "./abstract-component.js";

export default class SiteMenu extends AbstractComponent {

  getTemplate() {
    return (
      `<nav class="main-navigation">
        <a href="#stats" class="main-navigation__additional  js-stats">Stats</a>
      </nav>`
    );
  }


  setStatsButtonClickHandler(handler) {
    this.getElement().querySelector(`.js-stats`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler();
      });
  }
}
