import {DEFAULT_FILTER} from "../const.js";
import {Filters} from "../mock/filter.js";


const createFilterMarkup = (filter, isActive = false) => {
  const [key, value] = filter;
  return (
    `<a href="#${key}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">${value}</a>`
  );
};

const createFiltersMarkup = () => {
  const filtersMarkup = [];
  Filters.forEach((value, key) => filtersMarkup.push(createFilterMarkup([key, value], key === DEFAULT_FILTER)));
  return filtersMarkup.join(`\n`);
};

const createSiteMenuTemplate = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${createFiltersMarkup()}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};


export {createSiteMenuTemplate};
