/*
  Maximum delay value
    Browsers store the delay as a 32-bit signed integer internally.
  This causes an integer overflow when using delays larger than
  2,147,483,647 ms (about 24.8 days),
  resulting in the timeout being executed immediately.
 */

const MAX_INT_32 = 2_147_483_647;

const toMaxSafeDelayInteger = (number: number) => Math.min(number, MAX_INT_32);

export { toMaxSafeDelayInteger };
