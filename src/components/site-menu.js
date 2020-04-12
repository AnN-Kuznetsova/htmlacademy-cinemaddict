import {FILTERS} from "../const.js";
import {createFiltersMarkup} from "../components/filter.js";

const createSiteMenuTemplate = (films) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${createFiltersMarkup(FILTERS, films)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};


export {createSiteMenuTemplate};
