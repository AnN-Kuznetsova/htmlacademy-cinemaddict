import {getRandomArrayElement, getRandomDate, generateRandomText} from "../random.js";
import {EMOJI} from "../const.js";

const AUTORS = [
  `Tim Macoveev`,
  `John Doe`,
  `Jackson	`,
  `Benjamin`,
  `Amelia`,
];

const MIN_DATE_RANGE = 0;
const MAX_DATE_RANGE = 365;

const PROTOTYPE_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const MIN_TEXT_SENTENSE_COUNT = 1;
const MAX_TEXT_SENTENSE_COUNT = 5;

const generateComment = () => {
  return {
    text: generateRandomText(PROTOTYPE_TEXT, MIN_TEXT_SENTENSE_COUNT, MAX_TEXT_SENTENSE_COUNT),
    emoji: getRandomArrayElement(EMOJI),
    author: getRandomArrayElement(AUTORS),
    dayAndTime: getRandomDate(MIN_DATE_RANGE, MAX_DATE_RANGE),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};


export {generateComments};
