const getUserRank = (filmsQuantity) => {
  switch (true) {
    case ((filmsQuantity >= 1) && (filmsQuantity <= 10)):
      return `Novice`;
    case ((filmsQuantity >= 11) && (filmsQuantity <= 20)):
      return `Fan`;
    case (filmsQuantity >= 21):
      return `Movie Buff`;
    default:
      return ``;
  }
};


export {getUserRank};
