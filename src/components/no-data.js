export const noData = (filmsListTitleElement) => {
  filmsListTitleElement.textContent = `There are no movies in our database`;
  filmsListTitleElement.classList.remove(`visually-hidden`);
};
