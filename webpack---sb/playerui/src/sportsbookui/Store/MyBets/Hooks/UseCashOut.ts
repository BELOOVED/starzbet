import { useEffect, useState } from "react";
import { type IMoney, useAction, useParamSelector } from "@sb/utils";
import { cashOutBetAction, cashOutPartialAction } from "../../CashOut/CashOutAction";
import { partialCashOutByPercentSelector, successCashOutSelector } from "../Selectors/CashoutSelectors";

const useCashOut = (betId: string): [IMoney, () => void, number, (percent: number) => void] => {
  const fullCashOut = useAction(cashOutBetAction);
  const partialCashOut = useAction(cashOutPartialAction);

  const [percent, setPercent] = useState(100);

  const currentCashOut = useParamSelector(partialCashOutByPercentSelector, [betId, percent]);

  const s = useParamSelector(successCashOutSelector, [betId]);

  useEffect(
    () => {
      setPercent(100);
    },
    [s],
  );

  const handler = () => {
    if(percent < 100){
      partialCashOut(betId, currentCashOut);
    } else{
      fullCashOut(betId);
    }
  };

  return [currentCashOut, handler, percent, setPercent];
};

export { useCashOut };
