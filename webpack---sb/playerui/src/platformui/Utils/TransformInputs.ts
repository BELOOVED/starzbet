// @ts-nocheck
import { type ChangeEvent } from "react";

const transformDateOfBirthNew = (e: ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value;

  if (value === "") {
    return "";
  }

  value = value.replace(/[^0-9/]/g, "");

  if (value.length > 2 && value.charAt(2) !== "/") {
    value = value.slice(0, 2) + "/" + value.slice(2);
  }

  if (value.length > 5 && value.charAt(5) !== "/") {
    value = value.slice(0, 5) + "/" + value.slice(5);
  }

  if (value.length > 10) {
    value = value.slice(0, 10);
  }

  return value;
};

/* CPF Format 000.000.000-00 */
/* Transform on input change */
const transformCPF = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;

  if (value === "") {
    return "";
  }

  const numeric = value.replace(/[^0-9]+/g, "") || "";
  const cpfLength = numeric.length;

  const partOne = numeric.slice(0, 3) + ".";
  const partTwo = numeric.slice(3, 6) + ".";
  const partThree = numeric.slice(6, 9) + "-";

  if (cpfLength < 4) {
    return numeric;
  } else if (cpfLength >= 4 && cpfLength < 7) {
    return partOne + numeric.slice(3);
  } else if (cpfLength >= 7 && cpfLength < 10) {
    return partOne +
      partTwo +
      numeric.slice(6);
  } else if (cpfLength >= 10 && cpfLength < 12) {
    return partOne +
      partTwo +
      partThree +
      numeric.slice(9);
  }

  return partOne +
    partTwo +
    partThree +
    numeric.slice(9, 11);
};

const clearCPF = (cpf: string) => cpf.replace(/[^ 0-9]+/g, "");

export {
  transformDateOfBirthNew,
  transformCPF,
  clearCPF,
};
