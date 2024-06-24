const OPERATOR_INTERRUPT_SYMBOL = Symbol("Operator Interrupt");

type TOperator<V> = {
  displayName: string;
  item: (value: V) => typeof OPERATOR_INTERRUPT_SYMBOL | V;
  reset: () => void;
};

/**
 * Interrupts decorator until number of operator calls less that or equal provided skip count.
 *
 * @param {Number} count - The number of times decorator must be skipped.
 */
const skip = <V>(count: number): TOperator<V> => {
  let calls = 0;

  return {
    displayName: "skip",
    item: (value: V) => {
      if (calls < count) {
        calls++;

        return OPERATOR_INTERRUPT_SYMBOL;
      }

      calls++;

      return value;
    },
    reset: () => {
      calls = 0;
    },
  };
};

/**
 * Decorator will not be interrupted until the number of operator calls is less than or equal provided count.
 *
 * @param {Number} count - The number of times decorator must be called
 */
const take = <V>(count: number): TOperator<V> => {
  let calls = 0;

  return {
    displayName: "take",
    item: (value: V) => {
      if (calls < count) {
        calls++;

        return value;
      }

      calls++;

      return OPERATOR_INTERRUPT_SYMBOL;
    },
    reset: () => {
      calls = 0;
    },
  };
};

/**
 * Interrupts decorator when predicate returns "false".
 *
 * @param predicate Function that returns boolean that defines should decorator be interrupted. Boolean constructor used as default.
 * If "true" decorator will not be interrupted.
 * If "false" will be interrupted
 */
const filter = <V>(predicate: (value: V) => boolean = Boolean): TOperator<V> => ({
  displayName: "filter",
  item: (value: V) => {
    if (predicate(value)) {
      return value;
    }

    return OPERATOR_INTERRUPT_SYMBOL;
  },
  reset: () => undefined,
});

/**
 * Interrupts decorator after first call when current value distinct in comparison to previous value.
 *
 * @param comparator Function used to compare previous and current values for equality. Shallow equality used as default.
 */
const distinctUntilChanged = <V>(comparator: (prev: V, cur: V) => boolean = (a, b) => a === b): TOperator<V> => {
  let firstCall = true;
  let last: V = null as V;

  return {
    displayName: "distinctUntilChanged",
    item: (value: V) => {
      if (firstCall) {
        firstCall = false;
        last = value;

        return value;
      }

      if (comparator(last, value)) {
        return OPERATOR_INTERRUPT_SYMBOL;
      }

      last = value;

      return value;
    },
    reset: () => {
      firstCall = true;
      last = null as V;
    },
  };
};

export {
  type TOperator,
  OPERATOR_INTERRUPT_SYMBOL,
  skip,
  take,
  filter,
  distinctUntilChanged,
};
