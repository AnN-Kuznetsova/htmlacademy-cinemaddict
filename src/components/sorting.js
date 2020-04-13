const getSortingFilms = (films, parametr) => {
  return films.slice()
  .sort((left, right) =>
    (parametr === `comments`) ? (right.comments.length - left.comments.length) : (right[parametr] - left[parametr]));
};

const createSortingTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};


export {createSortingTemplate, getSortingFilms};
