import { type IMoney, Money, type TVoidFn, useParamSelector } from "@sb/utils";
import { maxAutoCashOutReachesSelector, minAutoCashOutReachesSelector } from "../Selectors/CashoutSelectors";

const useLimitAutoCashOutReaches = (betId: string, current: IMoney, setAmount: TVoidFn) => {
  const min = useParamSelector(minAutoCashOutReachesSelector, [betId]);
  const max = useParamSelector(maxAutoCashOutReachesSelector, [betId]);

  return () => {
    if (!current) {
      return false;
    }

    if (Money.lessThan(current, min)) {
      setAmount(Money.toUnit(min));

      return false;
    }

    if (Money.greaterThan(current, max)) {
      setAmount(Money.toUnit(max));

      return false;
    }

    return true;
  };
};

export { useLimitAutoCashOutReaches };
