import {AbstractComponent} from "./abstract-component.js";

export class FilmsBoard extends AbstractComponent {

  getTemplate() {
    return (
      `<section class="films"></section>`
    );
  }
}
