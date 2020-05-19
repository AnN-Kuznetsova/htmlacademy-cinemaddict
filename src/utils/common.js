import moment from "moment";
import {DateTimeFormat} from "../const.js";
import {SHAKE_ANIMATION_TIMEOUT} from "../const.js";


const formatDurationTime = (duration) => {
  const momentDuration = moment.duration(duration, `minutes`);
  const date = moment().startOf(`day`);
  return date.add(momentDuration).format(DateTimeFormat.DURATION);
};

const formatDate = (date, dateFormat) => {
  return moment(date).format(dateFormat);
};

const formatDateFromNow = (date) => {
  return moment(date).fromNow();
};


const getIndexById = (array, id) => {
  return array.findIndex((it) => it.id === id);
};

const arrayDataChange = (array, id, newData) => {
  const index = getIndexById(array, id);

  if (index !== -1) {
    array = [].concat(array.slice(0, index), newData, array.slice(index + 1));
  }


  return {
    array,
    index,
  };
};

const setСustomTimeOut = (timeOut, handler) => {
  setTimeout(() => {
    handler();
  }, timeOut);
};

const shakeElement = (element, value = true) => {
  element.style.animation = value ? `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s` : ``;
};

const adjustElementErrorStyle = (element, value = true) => {
  element.style.boxShadow = value ? `0 0 0 4px #ff4e4e` : ``;
};


export {
  getIndexById,
  arrayDataChange,
  formatDurationTime,
  formatDate,
  formatDateFromNow,
  setСustomTimeOut,
  shakeElement,
  adjustElementErrorStyle,
};
