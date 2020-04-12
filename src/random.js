//  Функция нахождения случайного числа
const getRandomIntegerNumber = function (num) {
  return Math.floor(Math.random() * (num + 1));
};

//  Функция нахождения случайного числа в заданном диапазоне
const getRandomIntegerNumberInRange = (min, max) => {
  return min + getRandomIntegerNumber(max - min);
};

//  Функция выбора случачйного элемента массива
const getRandomArrayElement = function (array) {
  return array[getRandomIntegerNumber(array.length - 1)];
};

//  Функция выбора нескольких случачйных элементов массива
const getRandomArrayElements = function (array, count) {
  const arrayElements = [];
  const arrayCopy = array.slice();

  for (let i = 0; i < count; i++) {
    const index = getRandomIntegerNumber(arrayCopy.length - 1);
    arrayElements.push(arrayCopy.splice(index, 1).join());
  }

  return arrayElements;
};

//  Функция взятия случайной даты в диапазоне
const getRandomDate = (minDateRange, maxDateRange) => {
  const targetDate = new Date();
  const diffValue = -1 * getRandomIntegerNumberInRange(minDateRange, maxDateRange);
  targetDate.setDate(targetDate.getDate() + diffValue);
  return targetDate;
};

//  Функция генерирования случаного значения Boolean
const generateBoolean = () => {
  return Math.random() > 0.5;
};

//  Функция сщставления текста из случайных предложений текста-прототипа
const generateRandomText = (textPrototype, minSentenseCount, maxSentenseCount) => {
  const sentenseCount = getRandomIntegerNumberInRange(minSentenseCount, maxSentenseCount);
  return getRandomArrayElements(textPrototype.split(`. `), sentenseCount)
    .join(`. `);
};


export {getRandomIntegerNumber, getRandomArrayElement, getRandomArrayElements, getRandomDate, getRandomIntegerNumberInRange, generateBoolean, generateRandomText};
