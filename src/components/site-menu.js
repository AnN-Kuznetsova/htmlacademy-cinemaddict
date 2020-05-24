import AbstractComponent from "./abstract-component.js";


const MENU_ACTIVE_CLASS = `main-navigation__item--active`;

const MenuItem = {
  FILTER: `filter`,
  STATS: `stats`,
};


export default class SiteMenu extends AbstractComponent {
  constructor() {
    super();

    this._setActiveItem = this._setActiveItem.bind(this);
  }


  getTemplate() {
    return (
      `<nav class="main-navigation">
        <a href="#stats"
          id="js-${MenuItem.STATS}--"
          class="main-navigation__additional"
          data-menu-item="${MenuItem.STATS}"
        >Stats</a>
      </nav>`
    );
  }


  setMenuItemClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      const menuItem = evt.target.dataset.menuItem;

      evt.preventDefault();
      this._setActiveItem(evt.target.id);
      handler(menuItem);
    });
  }


  _setActiveItem(activeItemId) {
    const items = this.getElement().querySelectorAll(`a`);

    items.forEach((item) => {
      if (item.id === activeItemId) {
        item.classList.add(MENU_ACTIVE_CLASS);
      } else {
        if (item.classList.contains(MENU_ACTIVE_CLASS)) {
          item.classList.remove(MENU_ACTIVE_CLASS);
        }
      }
    });
  }
}


export {MenuItem};
