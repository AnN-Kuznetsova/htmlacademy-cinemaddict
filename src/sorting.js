const SortType = {
  DEFAULT: `default`,
  BY_DATE: `by-date`,
  BY_RATING: `by-rating`,
};


const getFieldFinder = (sortType) => {
  let findField = null;

  switch (sortType) {
    case SortType.BY_DATE:
      findField = (film) => film.releaseDate;
      break;
    case SortType.BY_RATING:
      findField = (film) => film.rating;
      break;
    default:
      findField = (element) => element;
  }

  return findField;
};


const getSortDescending = (array, cb = (element) => element) => {
  return array.slice()
    .sort((left, right) => (cb(right) - cb(left)));
};


const getSortFilms = (films, sortType) => {
  let sortedTasks = [];

  switch (sortType) {
    case SortType.DEFAULT.name:
      sortedTasks = films;
      break;
    default:
      sortedTasks = getSortDescending(films, getFieldFinder(sortType));
  }

  return sortedTasks;
};


export {
  SortType,
  getSortFilms,
  getFieldFinder,
};
