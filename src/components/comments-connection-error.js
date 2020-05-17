import AbstractComponent from "./abstract-component.js";

export default class CommentsConnectionError extends AbstractComponent {

  getTemplate() {
    return (
      `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">
          Sorry. <br>
          Comments are temporarily unavailable.
        </h3>
      </section>`
    );
  }
}
