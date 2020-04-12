import {DEFAULT_FILTER} from "../const.js";

const createFilterMarkup = (filter, isActive = false) => {
  const [key, value] = filter;
  return (
    `<a href="#${key}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">${value}</a>`
  );
};

const createFiltersMarkup = (filters) => {
  return Array.from(filters)
    .map(([value, key]) => createFilterMarkup([value, key], value === DEFAULT_FILTER))
    .join(`\n`);
};


export {createFiltersMarkup};
