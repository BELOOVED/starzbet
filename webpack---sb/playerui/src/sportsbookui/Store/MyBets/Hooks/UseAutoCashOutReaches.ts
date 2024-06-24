import { useEffect, useState } from "react";
import { Money, useParamSelector } from "@sb/utils";
import { minAutoCashOutReachesSelector } from "../Selectors/CashoutSelectors";

const useAutoCashOutReaches = (betId: string) => {
  const minAutoCashOut = useParamSelector(minAutoCashOutReachesSelector, [betId]);

  const [amount, setAmount] = useState(Money.toUnit(minAutoCashOut));

  const [money, setMoney] = useState(minAutoCashOut);

  const handler = (normalized: string, input?: string) => {
    const nextMoney = Money.parseOrZero(normalized, money.currency);

    setMoney(nextMoney);

    setAmount(input === void 0 ? Money.toUnit(nextMoney) : input);
  };

  useEffect(
    () => {
      if(Money.greaterThan(minAutoCashOut, money)) {
        handler(Money.toUnit(minAutoCashOut));
      }
    },
    [minAutoCashOut.amount, minAutoCashOut.currency],
  );

  return [amount, money, handler];
};

export { useAutoCashOutReaches };
