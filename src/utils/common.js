import moment from "moment";
import {DATE_TIME_FORMAT} from "../const.js";


const MonthFormat = {
  0: `January`,
  1: `February`,
  2: `March`,
  3: `April`,
  4: `May`,
  5: `June`,
  6: `July`,
  7: `August`,
  8: `September`,
  9: `October`,
  10: `November`,
  11: `December`,
};

const formatDuration = (duration) => {
  const momentDuration = moment.duration(duration, `minutes`);
  const date = moment().startOf(`day`);
  return date.add(momentDuration).format(DATE_TIME_FORMAT.duration);
};

const castDateFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castDateFormat(date.getHours() % 12);
  const minutes = castDateFormat(date.getMinutes());
  return `${hours}:${minutes}`;
};

const formatDateToString = (date) => {
  const year = date.getFullYear();
  const month = MonthFormat[date.getMonth()];
  const day = castDateFormat(date.getDate());
  return `${day} ${month} ${year}`;
};

const formatDateWithSlash = (date) => {
  const year = date.getFullYear();
  const month = castDateFormat(date.getMonth() + 1);
  const day = castDateFormat(date.getDate());
  return `${year}/${month}/${day}`;
};

const onEscPress = (evt, action) => {
  const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
  if (isEscKey) {
    action();
  }
};

const arrayDataChange = (array, oldData, newData) => {
  const index = array.findIndex((it) => it === oldData);

  if (index !== -1) {
    array = [].concat(array.slice(0, index), newData, array.slice(index + 1));
  }

  return {
    array,
    index,
  };
};


export {
  onEscPress,
  formatDateToString,
  formatDateWithSlash,
  formatTime,
  arrayDataChange,
  formatDuration,
};
