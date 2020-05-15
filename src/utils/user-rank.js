const UserRank = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`,
  DEFAULT: ``,
};


const getUserRank = (filmsQuantity) => {
  switch (true) {
    case ((filmsQuantity >= 1) && (filmsQuantity <= 10)):
      return UserRank.NOVICE;
    case ((filmsQuantity >= 11) && (filmsQuantity <= 20)):
      return UserRank.FAN;
    case (filmsQuantity >= 21):
      return UserRank.MOVIE_BUFF;
    default:
      return UserRank.DEFAULT;
  }
};


export {getUserRank};
