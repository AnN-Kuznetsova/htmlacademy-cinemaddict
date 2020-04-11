import {getRandomIntegerNumber, getRandomIntegerNumberInRange, getRandomArrayElement, getRandomArrayElements, getRandomDate, generateBoolean} from "../random.js";
import {GENRE} from "../const.js";

const TITLE_ITEMS = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `The Great Flamarion`,
  `Made for Each Other`
];

const POSTER_ITEMS = [
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`
];

const MAX_RATING = 10;
const MIN_YEAR = 1929;
const MAX_YEAR = 2020;
const MIN_GENRE_COUNT = 1;
const MAX_GENRE_COUNT = 3;
const MAX_DURATION = 3;

const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const MIN_DESCRIPTION_SENTENSE_COUNT = 1;
const MAX_DESCRIPTION_SENTENSE_COUNT = 5;

const descriptionItems = DESCRIPTION.split(`. `);

const generateDescription = () => {
  return getRandomArrayElements(descriptionItems, getRandomIntegerNumberInRange(MIN_DESCRIPTION_SENTENSE_COUNT, MAX_DESCRIPTION_SENTENSE_COUNT))
    .join(`. `);
};

const generateRating = () => {
  return getRandomIntegerNumber(MAX_RATING - 1) + Math.round(Math.random() * 10) / 10;
};

const generateGenre = () => {
  return getRandomArrayElements(GENRE, getRandomIntegerNumberInRange(MIN_GENRE_COUNT, MAX_GENRE_COUNT))
    .join(`, `);
};

const generateDuration = () => {
  const hours = getRandomIntegerNumber(MAX_DURATION);
  const minutes = (hours === MAX_DURATION) ? 0 : getRandomIntegerNumber(60);
  return `${hours}h ${minutes}m`;
};

const generateFilm = () => {
  return {
    title: getRandomArrayElement(TITLE_ITEMS),
    rating: generateRating(),
    year: getRandomIntegerNumberInRange(MIN_YEAR, MAX_YEAR),
    duration: generateDuration(),
    genre: generateGenre(),
    poster: getRandomArrayElement(POSTER_ITEMS),
    description: generateDescription(),
    isAddToWatchlist: generateBoolean(),
    isMarkAsWatched: generateBoolean(),
    isFavorite: generateBoolean(),
    comments: [],
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};


export {generateFilms};
