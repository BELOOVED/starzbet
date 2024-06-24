import { type IMoney, Money, useParamSelector } from "@sb/utils";
import { maxPartialAutoCashOutSelector, minPartialAutoCashOutSelector } from "../Selectors/CashoutSelectors";

const useLimitPartialAutoCashOut = (betId: string, auto: boolean, partialMoney: IMoney, setPartialAmount) => {
  const max = useParamSelector(maxPartialAutoCashOutSelector, [betId]);
  const min = useParamSelector(minPartialAutoCashOutSelector, [betId]);

  return () => {
    if (!auto && Money.lessThan(partialMoney, min)) {
      setPartialAmount(Money.toUnit(min));

      return false;
    }

    if (!auto && Money.greaterThan(partialMoney, max)) {
      setPartialAmount(Money.toUnit(max));

      return false;
    }

    return true;
  };
};

export { useLimitPartialAutoCashOut };
