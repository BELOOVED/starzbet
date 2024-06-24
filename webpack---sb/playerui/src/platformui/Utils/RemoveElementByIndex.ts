// @ts-nocheck
const removeElementByIndex = (array, index) => {
  const arrayCopy = [...array];

  arrayCopy.splice(index, 1);

  return arrayCopy;
};

export { removeElementByIndex };
