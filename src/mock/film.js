import {getRandomIntegerNumber, getRandomIntegerNumberInRange, getRandomArrayElement, getRandomArrayElements, generateBoolean, generateRandomText} from "../random.js";
import {GENRE, AGE, COUNTRY} from "../const.js";
import {generateComments} from "./comment.js";

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

const DIRECTOR_ITEMS = [
  `Steven Spielberg`,
  `Peter Jackson`,
  `Martin Scorsese`,
  `Christopher Nolan`,
  `Steven soderberg`,
  `Ridley Scott`,
  `Quentin Tarantino`,
  `Michael Mann`,
];

const WRITER_ITEMS = [
  `Christopher Nolan`,
  `Luc Besson`,
  `John Hughes`,
  `Martin Scorsese`,
  `Guy Ritchie`,
  `Frank Darabont`,
  `Stephen King`,
  `Danny Boyle`,
  `Quentin Tarantino`,
];

const ACTOR_ITEMS = [
  `Jim Carrey`,
  `Tim Robbins`,
  `Robin Williams`,
  `Jude Law`,
  `Samuel L. Jackson`,
  `Mel Gibson`,
  `Denzel Washington`,
  `Antonio Banderas`,
  `Tom Cruise`,
  `Brad Pitt`,
  `Matt Damon`,
  `Christopher Walken`,
  `Leonardo DiCaprio`,
  `Michael Caine`,
];

const MAX_RATING = 10;
const MIN_YEAR = 1929;
const MAX_YEAR = 2020;
const MIN_GENRE_COUNT = 1;
const MAX_GENRE_COUNT = 3;
const MIN_WRITER_COUNT = 1;
const MIN_ACTOR_COUNT = 1;
const MAX_DURATION = 3;
const MAX_COMMENTS_COUNT = 5;

const DESCRIPTION_PROTOTYPE = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const MIN_DESCRIPTION_SENTENSE_COUNT = 1;
const MAX_DESCRIPTION_SENTENSE_COUNT = 5;

const generateRating = () => {
  return getRandomIntegerNumber(MAX_RATING - 1) + Math.round(Math.random() * 10) / 10;
};

const generateDuration = () => {
  const hours = getRandomIntegerNumber(MAX_DURATION);
  const minutes = (hours === MAX_DURATION) ? 0 : getRandomIntegerNumber(60);
  return `${hours}h ${minutes}m`;
};

const generateReleaseDate = () => {
  const year = getRandomIntegerNumberInRange(MIN_YEAR, MAX_YEAR);
  const month = getRandomIntegerNumber(11);
  const day = getRandomIntegerNumber(30);
  return new Date(year, month, day);
};

const generateFilm = () => {
  const title = getRandomArrayElement(TITLE_ITEMS);

  return {
    title,
    originalTitle: title,
    rating: generateRating(),
    director: getRandomArrayElement(DIRECTOR_ITEMS),
    writers: getRandomArrayElements(WRITER_ITEMS, getRandomIntegerNumberInRange(MIN_WRITER_COUNT, WRITER_ITEMS.length - 1)),
    actors: getRandomArrayElements(ACTOR_ITEMS, getRandomIntegerNumberInRange(MIN_ACTOR_COUNT, ACTOR_ITEMS.length - 1)),
    releaseDate: generateReleaseDate(),
    duration: generateDuration(),
    country: getRandomArrayElement(COUNTRY),
    genre: getRandomArrayElements(GENRE, getRandomIntegerNumberInRange(MIN_GENRE_COUNT, MAX_GENRE_COUNT)),
    poster: getRandomArrayElement(POSTER_ITEMS),
    description: generateRandomText(DESCRIPTION_PROTOTYPE, MIN_DESCRIPTION_SENTENSE_COUNT, MAX_DESCRIPTION_SENTENSE_COUNT),
    age: getRandomArrayElement(AGE),
    isAddToWatchlist: generateBoolean(),
    isMarkAsWatched: generateBoolean(),
    isFavorite: generateBoolean(),
    comments: generateComments(getRandomIntegerNumber(MAX_COMMENTS_COUNT)),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};


export {generateFilms};
