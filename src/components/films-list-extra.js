const getClassName = (title) => {
  return title.toLowerCase()
    .split(` `)
    .join(`-`);
};

const createFilmsListExtraTemplate = (title) => {
  return (
    `<section class="films-list--extra ${getClassName(title)}">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};


export {createFilmsListExtraTemplate};
