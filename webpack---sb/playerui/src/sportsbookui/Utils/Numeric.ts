import Big from "big.js";

Big.RM = 2;

class Numeric {
  static truncate(number: number, digits = 6) {
    const re = new RegExp(`(\\d+\\.\\d{${digits}})(\\d)`);
    const m = number.toString().match(re);

    return m
      ? parseFloat(m[1])
      : number.valueOf();
  }

  static toFixed(big: Big) {
    return big.toFixed(10);
  }

  static plus(num1, num2) {
    return Number(Numeric.toFixed(Big(Number(num1)).plus(Number(num2))));
  }

  static minus(num1, num2) {
    return Number(Numeric.toFixed(Big(Number(num1)).minus(Number(num2))));
  }

  static mul(num1, num2) {
    return Number(Numeric.toFixed(Big(Number(num1)).times(Number(num2))));
  }

  static div(num1, num2) {
    return Number(Numeric.toFixed(Big(Number(num1)).div(Number(num2))));
  }
}

export { Numeric };
