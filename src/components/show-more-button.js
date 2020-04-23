import {AbstractComponent} from "./abstract-component.js";

export class ShowMoreButton extends AbstractComponent {

  getTemplate() {
    return (
      `<button class="films-list__show-more">Show more</button>`
    );
  }

  setOnShowMoreButtonClick(cb) {
    this.getElement().addEventListener(`click`, cb);
  }
}
