import { Currency } from "./Currency";
import Dinero from "dinero.js";
import { ECurrencyCode } from "./ECurrencyCode";
import { ECurrencySymbol } from "./ECurrencySymbol";
import { TExplicitAny } from "./TAny";
import { TNullable } from "./TNullable";
import { isNotVoid } from "./IsVoid";

export enum EMoneyFormat {
  codeRight = "codeRight",
  codeLeft = "codeLeft",
  symbolRight = "symbolRight",
  symbolLeft = "symbolLeft",
}

export interface IMoney {
  amount: string;
  currency: ECurrencyCode;
}

export interface IMoneyBag {
  additional: Array<IMoney>;
  system: IMoney;
}

export interface ICurrencyPair {
  base: ECurrencyCode;
  counter: ECurrencyCode;
  rate: number;
  date: string;
  provider: string;
}

export interface IMoneyTransaction {
  date: string;
  external: IMoney;
  system: IMoney;
  currencyPair: ICurrencyPair;
}

export interface IMoneyFormatOptions {
  sign?: boolean;
  abs?: boolean;
  abbreviated?: boolean;
  grouping?: boolean;
}

const formatesWithCode = [EMoneyFormat.codeRight, EMoneyFormat.codeLeft];
const formatesRight = [EMoneyFormat.codeRight, EMoneyFormat.symbolRight];

const roundingMode = "HALF_EVEN";
// @ts-ignore
Dinero.globalRoundingMode = roundingMode;
// @ts-ignore
Dinero.globalFormatRoundingMode = roundingMode;


const formatAbbr = (unit: string) => {
  const num = Number(unit.replaceAll(",", ""));

  if (num < 1e3) return unit;

  if (num >= 1e3 && num < 1e6) return (num / 1e3).toFixed(1) + "k";

  if (num >= 1e6 && num < 1e9) return (num / 1e6).toFixed(1) + "m";

  if (num >= 1e9 && num < 1e12) return (num / 1e9).toFixed(1) + "b";

  if (num >= 1e12) return (num / 1e12).toFixed(1) + "t";

  throw new Error(`Invalid unit ${unit}`);
};

const handleOptions = (unit: string, currency: ECurrencyCode | ECurrencySymbol | "", money: IMoney, options: IMoneyFormatOptions) => {
  let changedUnit = unit.replace("-", "");
  let sign = Money.isPositive(money) ? "" : "-";

  if (options.grouping) {
    const dinero = Money.toDinero(money);

    const format = `0,0.${"0".repeat(dinero.getPrecision())}`;

    changedUnit = dinero.toFormat(format).replace("-", "");
  }

  if (options.abbreviated) {
    changedUnit = formatAbbr(changedUnit);
  }

  if (options.sign) {
    sign = Money.isPositive(money) ? "+" : sign;
  }

  if (options.abs) {
    sign = "";
  }

  return { sign, unit: changedUnit, currency };
}

const addSignWithSpace = (sign: string, rest: string) => sign
  ? `${sign}${rest}`
  : rest;

const concatWithSpace = (sign: string | null, currency: ECurrencyCode | ECurrencySymbol | "", unit: string) =>
  sign
    ? `${currency} ${sign}${unit}`
    : `${currency} ${unit}`;

export class Money {
  private constructor() {
  }

  /**
   * @throws Error
   */
  static create(amount: string, currency: ECurrencyCode): IMoney {
    if (!Money.isValidAmount(amount)) {
      throw new Error(`Not valid amount: ${amount} received`);
    }

    if (!Currency.isSupported(currency)) {
      throw new Error(`Not supported currency: ${currency}`);
    }

    return {
      amount,
      currency,
    };
  }

  /**
   * @throws Error
   */
  static parseAny(amount: any, currency: ECurrencyCode): IMoney {
    const subUnit = Money.getPrecision(currency);
    const normalizedAmount = amount % 1 === 0 ? amount : amount.toString();

    if (typeof normalizedAmount === "number") {
      if (normalizedAmount === 0) {
        return Money.getZero(currency);
      }

      return Money.create(`${normalizedAmount}${Array(subUnit).fill(0).join("")}`, currency);
    }

    if (
      typeof normalizedAmount === "string" &&
      normalizedAmount.indexOf(".") === -1 &&
      normalizedAmount.indexOf(",") === -1
    ) {
      if (normalizedAmount === "0") {
        return Money.getZero(currency);
      }

      if (!Money.isValidAmount(normalizedAmount)) {
        throw new Error(`Not valid amount: ${normalizedAmount}`);
      }

      return Money.create(`${normalizedAmount}${Array(subUnit).fill(0).join("")}`, currency);
    }

    let separator;

    if (normalizedAmount.indexOf(".") !== -1) {
      separator = ".";
    } else if (normalizedAmount.indexOf(",") !== -1) {
      separator = ",";
    }

    if (separator !== undefined) {
      const parts = normalizedAmount.split(separator);

      if (!Money.isValidAmount(parts[0]) && !Money.isValidAmount(parts[1])) {
        throw new Error(`Not valid amount: ${normalizedAmount}`);
      }

      let subUnitPart = parts[1];

      if (subUnitPart.length < subUnit) {
        subUnitPart = `${subUnitPart}${Array(subUnit - subUnitPart.length).fill(0).join("")}`;
      }

      if (subUnitPart.length > subUnit) {
        const subUnitFirst = subUnitPart.slice(0, subUnit);
        const subUnitSecond = subUnitPart.slice(subUnit, subUnitPart.length);

        const rounded = Math.round(parseFloat(`${subUnitFirst}.${subUnitSecond}`));

        if (subUnitFirst[0] === "0") {
          subUnitPart = `0${rounded.toString()}`;
        } else {
          subUnitPart = rounded.toString();
        }

      }

      const resultAmount = `${parts[0]}${subUnitPart}`.replace(/^0+/, "");

      if (parseInt(resultAmount, 10) === 0 || resultAmount === "") {
        return Money.getZero(currency);
      }

      return Money.create(resultAmount, currency);
    }

    throw new Error(`Could't convert amount: ${normalizedAmount}`);
  }

  static parseOrZero(amount: any, currency: ECurrencyCode): IMoney {
    try {
      return Money.parseAny(amount, currency);
    } catch (e) {
      return Money.getZero(currency);
    }
  }

  static toFormat(money: IMoney, format: EMoneyFormat, options: IMoneyFormatOptions = {}) {
    if (!Currency.isSupported(money.currency)) {
      throw new Error(`Not supported currency: ${money.currency}`);
    }

    const unit = Money.toUnit(money);

    const currency = formatesWithCode.includes(format)
      ? money.currency
      : Currency.SYMBOLS[money.currency];

    const formatted = handleOptions(unit, currency, money, { grouping: true, ...options });

    if (formatesRight.includes(format)) {
      return addSignWithSpace(formatted.sign, `${formatted.unit} ${formatted.currency}`);
    }

    return concatWithSpace(formatted.sign, formatted.currency, formatted.unit);
  }

  static toUnit(money: IMoney, options: IMoneyFormatOptions = {}) {
    if (!Money.isMoney(money)) {
      throw new Error(`Not valid money: ${money} received`);
    }

    if (!Money.validate(money.amount, money.currency)) {
      throw new Error("Not valid money received");
    }

    const dinero = Money.toDinero(money);

    const precision = dinero.getPrecision();

    const format = `0.${"0".repeat(precision)}`;

    const unit = dinero.toFormat(format);

    const formatted = handleOptions(unit, "", money, options);

    return `${formatted.sign}${formatted.unit}`;
  }

  static toNumber(money: IMoney, options: IMoneyFormatOptions = {}) {
    return Number(Money.toUnit(money, options));
  }

  static getZero(currency: ECurrencyCode) {
    return Money.create("0", currency);
  }

  static getPrecision(currency: string) {
    // @ts-ignore
    return Dinero({ currency }).getPrecision();
  }

  static validate(amount: TExplicitAny, currency: TExplicitAny): boolean {
    return Money.isValidAmount(amount) && Currency.isSupported(currency);
  }

  static isValidAmount(amount: TExplicitAny): boolean {
    if (typeof amount !== "string") {
      return false;
    }

    if (amount === "") {
      return false;
    }

    const num = Number(amount);

    if (Number.isNaN(num)) {
      return false
    }

    return Number.isInteger(num);
  }

  static isMoney(value: unknown): value is IMoney {
    return Boolean(
      typeof value === "object" &&
      value?.hasOwnProperty("amount") &&
      value?.hasOwnProperty("currency"),
    );
  }

  static isZero(money: IMoney): boolean {
    return Money.toDinero(money).isZero();
  }

  static notZeroAndValid(value: TNullable<IMoney>): value is IMoney {
    return isNotVoid(value) && !Money.isZero(value);
  }

  static isSameCurrency(a: IMoney, b: IMoney) {
    return Money.toDinero(a).hasSameCurrency(Money.toDinero(b));
  }

  static isPositive(money: IMoney): boolean {
    return Money.toDinero(money).isPositive();
  }

  static hasCurrency(money: IMoney, currency: string) {
    return Money.toDinero(money).getCurrency() === currency;
  }

  static add(a: IMoney, b: IMoney) {
    if (![a, b].every(Money.isMoney)) {
      throw new Error("Every arguments should be type of Money");
    }

    return Money.convertDineroToMoney(
      Money.toDinero(a).add(Money.toDinero(b)),
    );
  }

  static sum(...mx: IMoney[]): IMoney | undefined {
    const first = mx[0];

    if (!first) {
      return undefined;
    }

    return mx.reduce((sum, item) => Money.add(sum, item), Money.getZero(first.currency));
  }

  static subtract(a: IMoney, b: IMoney) {
    if (![a, b].every(Money.isMoney)) {
      throw new Error("Every arguments should be type of Money");
    }

    return Money.convertDineroToMoney(
      Money.toDinero(a).subtract(Money.toDinero(b)),
    );
  }

  static multiply(money: IMoney, multiplier: number) {
    if (!Money.isMoney(money)) {
      throw new Error(`Not valid money: ${money} received`);
    }

    return Money.convertDineroToMoney(
      Money.toDinero(money).multiply(multiplier),
    );
  }

  static divide(money: IMoney, divisor: number) {
    if (!Money.isMoney(money)) {
      throw new Error(`Not valid money: ${money} received`);
    }

    return Money.convertDineroToMoney(
      Money.toDinero(money).divide(divisor),
    );
  }

  static min(...moneys: IMoney[]) {
    if (!moneys.every(Money.isMoney)) {
      throw new Error("Every arguments should be type of Money");
    }

    // @ts-ignore - should be boundary check disabled by pref reason
    let min = Money.toDinero(moneys[0]);
    let i = moneys.length;
    let next;

    while (i--) {
      // @ts-ignore - should be boundary check disabled by pref reason
      next = Money.toDinero(moneys[i]);

      min = next.lessThan(min) ? next : min;
    }

    return Money.convertDineroToMoney(min);
  }

  static max(...moneys: IMoney[]) {
    if (!moneys.every(Money.isMoney)) {
      throw new Error("Every arguments should be type of Money");
    }

    // @ts-ignore - should be boundary check disabled by pref reason
    let max = Money.toDinero(moneys[0]);
    let i = moneys.length;
    let next;

    while (i--) {
      // @ts-ignore - should be boundary check disabled by pref reason
      next = Money.toDinero(moneys[i]);

      max = next.greaterThan(max) ? next : max;
    }

    return Money.convertDineroToMoney(max);
  }

  static lessThan(a: IMoney, b: IMoney) {
    return Money.toDinero(a).lessThan(Money.toDinero(b));
  }

  static greaterThan(a: IMoney, b: IMoney) {
    return Money.toDinero(a).greaterThan(Money.toDinero(b));
  }

  static greaterThanOrEqual(a: IMoney, b: IMoney) {
    return Money.toDinero(a).greaterThanOrEqual(Money.toDinero(b));
  }

  static lessThanOrEqual(a: IMoney, b: IMoney) {
    return Money.toDinero(a).lessThanOrEqual(Money.toDinero(b));
  }

  static equalsTo(a: IMoney, b: IMoney) {
    return Money.toDinero(a).equalsTo(Money.toDinero(b));
  }

  static percent(total: IMoney, partial: IMoney) {
    const floatPercent = Money.toDinero(partial).toUnit() / Money.toDinero(total).toUnit() * 100;
    const rounded = Math.round(floatPercent * 100) / 100;

    return isNaN(rounded) ? 0 : rounded; // HALF_EVEN
  }

  static toDinero({ amount, ...rest }: IMoney | Dinero.Options) {
    // @ts-ignore
    return Dinero({
      ...rest,
      // @ts-ignore
      amount: +amount,
    });
  }

  private static convertDineroToMoney(dinero: Dinero.Dinero) {
    return Money.create(
      dinero.getAmount().toString(),
      dinero.getCurrency() as ECurrencyCode,
    );
  }
}

export { formatAbbr }
