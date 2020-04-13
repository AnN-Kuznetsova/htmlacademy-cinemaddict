import {filmsFilters} from "./filter.js";

const getUserRank = (filters = filmsFilters) => {
  let userRank = ``;
  const watchedFilmsCount = filters.history.filteredFilms().length;
  switch (true) {
    case ((watchedFilmsCount >= 1) && (watchedFilmsCount <= 10)):
      userRank = `Novice`;
      break;
    case ((watchedFilmsCount >= 11) && (watchedFilmsCount <= 20)):
      userRank = `Fan`;
      break;
    case (watchedFilmsCount >= 21):
      userRank = `Movie Buff`;
      break;
    default:
  }
  return userRank;
};

const createUserRankTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getUserRank()}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};


export {createUserRankTemplate};
