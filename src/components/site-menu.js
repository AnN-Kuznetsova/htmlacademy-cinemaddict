import {AbstractComponent} from "./abstract-component.js";

export class SiteMenu extends AbstractComponent {

  getTemplate() {
    return (
      `<nav class="main-navigation">
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`
    );
  }
}
