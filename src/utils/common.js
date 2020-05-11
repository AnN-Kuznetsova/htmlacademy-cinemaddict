import moment from "moment";
import {DateTimeFormat} from "../const.js";


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


const onEscPress = (evt, action) => {
  const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
  if (isEscKey) {
    action();
  }
};

const getIndexById = (array, id) => {
  return array.findIndex((it) => it.id === id);
};

const arrayDataChange = (array, id, newData) => {
  const index = getIndexById(array, id); //array.findIndex((it) => it.id === id);

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
  getIndexById,
  arrayDataChange,
  formatDurationTime,
  formatDate,
  formatDateFromNow,
};
