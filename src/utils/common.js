import moment from "moment";
import {DateTimeFormat} from "../const.js";
import {SHAKE_ANIMATION_TIMEOUT} from "../const.js";


//  Функция нахождения случайного числа
const getRandomIntegerNumber = function (num) {
  return Math.floor(Math.random() * (num + 1));
};


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
  return array.findIndex((element) => element.id === id);
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


const getEnumPropertyKey = (Enumeration, value) => {
  let propertyKey = null;

  for (const twain of Object.entries(Enumeration)) {
    if (twain.includes(value)) {
      propertyKey = twain[0];
      break;
    }
  }

  return propertyKey;
};


const setСustomTimeOut = (timeOut, handler) => {
  setTimeout(() => {
    handler();
  }, timeOut);
};


const disableForm = (formElements, isDisabled = true) => {
  for (const element of formElements) {
    element.disabled = isDisabled;
  }
};


const setDisabledStyle = (elements, isDisabledStyle = true) => {
  for (const element of elements) {
    element.style.backgroundColor = isDisabledStyle ? `#aaaaaa` : ``;
  }
};


const shakeElement = (element, isShake = true) => {
  element.style.animation = isShake ? `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s` : ``;
};


const adjustElementErrorStyle = (element, isErrorStyle = true) => {
  element.style.boxShadow = isErrorStyle ? `0 0 0 4px #ff4e4e` : ``;
};


const isOnline = () => {
  return window.navigator.onLine;
};


export {
  adjustElementErrorStyle,
  arrayDataChange,
  disableForm,
  formatDate,
  formatDateFromNow,
  formatDurationTime,
  isOnline,
  getEnumPropertyKey,
  getIndexById,
  getRandomIntegerNumber,
  setDisabledStyle,
  setСustomTimeOut,
  shakeElement,
};
