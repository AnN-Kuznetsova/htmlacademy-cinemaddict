import AbstractComponent from "./abstract-component.js";

export default class FilmsListContainer extends AbstractComponent {

  getTemplate() {
    return (
      `<div class="films-list__container"></div>`
    );
  }
}
