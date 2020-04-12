const createGenreMarkup = (genre) => {
  return (
    `<span class="film-details__genre">${genre}</span>`
  );
};

const createGenresMarkup = (genres) => {
  return genres.slice().map((it) => createGenreMarkup(it)).join(`\n`);
};


export {createGenresMarkup};
