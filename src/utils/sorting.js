const SortType = {
  DEFAULT: `default`,
  BY_DATE: `by-date`,
  BY_RATING: `by-rating`,
  BY_COMMENTS_COUNT: `by-comments-count`,
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
    case SortType.BY_COMMENTS_COUNT:
      findField = (film) => film.commentsCount;
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
  if (sortType === SortType.DEFAULT) {
    return films;
  }

  return getSortDescending(films, getFieldFinder(sortType));
};


export {
  SortType,
  getSortFilms,
  getFieldFinder,
};
