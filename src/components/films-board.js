import AbstractComponent from "./abstract-component.js";

export default class FilmsBoard extends AbstractComponent {

  getTemplate() {
    return (
      `<section class="films"></section>`
    );
  }
}
