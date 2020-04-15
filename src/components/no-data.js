export const noData = () => {
  const filmsListTitleElement = document.querySelector(`.films-list__title`);
  filmsListTitleElement.textContent = `There are no movies in our database`;
  filmsListTitleElement.classList.remove(`visually-hidden`);
};
