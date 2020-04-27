const SortType = {
  DEFAULT: `default`,
  BY_DATE: `by-date`,
  BY_RATING: `by-rating`,
};


const getSortDescending = (array, cb = (a) => a) => {
  return array.slice()
    .sort((left, right) => (cb(right) - cb(left)));
};


const getSortedFilms = (films, sortType) => {
  let sortedTasks = [];

  switch (sortType) {
    case SortType.BY_DATE:
      //sortedTasks = getSortDescending(films, `releaseDate`);
      sortedTasks = getSortDescending(films, (film) => film.releaseDate);
      break;
    case SortType.BY_RATING:
      //sortedTasks = getSortDescending(films, `rating`);
      sortedTasks = getSortDescending(films, (film) => film.rating);
      break;
    case SortType.DEFAULT:
      sortedTasks = films;
      break;
    default:
      sortedTasks = films;
  }

  return sortedTasks;
};


export {
  SortType,
  getSortedFilms,
};
