import { ECurrencyCode, type IMoney, Money, type TArrayFixedLength, type TNullable } from "@sb/utils";

/**
 * Provide map for each currency (fallback -> FALLBACK_MIN_AMOUNT)
 */
const FALLBACK_MIN_AMOUNT_MAP: Partial<Record<ECurrencyCode, number>> = {
  [ECurrencyCode.EUR]: 1,
  [ECurrencyCode.TRY]: 100,
};

type TMoneyQuickInputValue = TArrayFixedLength<IMoney, 4>

const MAX_MULTIPLIER = 25;
const DEFAULT_MULTIPLIER: TArrayFixedLength<number, 4> = [1, 4, 20, MAX_MULTIPLIER];
const FALLBACK_MIN_AMOUNT = 100;

const transformMoneyAmount = (value: IMoney, fn: (value: number) => number) => Money.parseOrZero(
  fn(Money.toNumber(value)),
  value.currency,
);

/**
 * minValue + diff * X
 * @param minValue
 * @param maxValue
 */
const getMoneyMultipleOfMin = (minValue: IMoney, maxValue: IMoney) => (multiplier: number) => {
  const moneyDiff = Money.subtract(maxValue, minValue);

  return transformMoneyAmount(
    Money.add(
      minValue,
      Money.multiply(moneyDiff, multiplier),
    ),
    Math.ceil,
  );
};

const getMoneyInputQuickValues = (
  minValue: TNullable<IMoney>,
  maxValue: TNullable<IMoney>,
  currency: ECurrencyCode,
): TMoneyQuickInputValue => {
  const minAmountFallback = Money.parseAny(FALLBACK_MIN_AMOUNT_MAP[currency] ?? FALLBACK_MIN_AMOUNT, currency);
  const minValueRounded = minValue ? transformMoneyAmount(minValue, Math.ceil) : minAmountFallback;

  if (!maxValue || Money.lessThan(Money.multiply(minValueRounded, MAX_MULTIPLIER), maxValue)) {
    return DEFAULT_MULTIPLIER
      .map(
        (multiply) => Money.multiply(minValueRounded, multiply),
      ) as TMoneyQuickInputValue;
  }
  const maxValueRounded = transformMoneyAmount(maxValue, Math.floor);
  const getIntermediateValue = getMoneyMultipleOfMin(minValueRounded, maxValue);

  return [
    minValueRounded,
    getIntermediateValue(0.25),
    getIntermediateValue(0.5),
    maxValueRounded,
  ];
};

export { getMoneyInputQuickValues };
