const numberToComma = (num: number, precision?: number) => {
  const number = precision ? num.toFixed(precision) : num.toString();

  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export { numberToComma };
