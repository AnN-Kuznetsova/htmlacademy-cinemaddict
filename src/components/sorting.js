const getSortingFilms = (films, selectionParameter) => {
  return films.slice()
  .sort((left, right) => (right[selectionParameter] - left[selectionParameter]));
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
