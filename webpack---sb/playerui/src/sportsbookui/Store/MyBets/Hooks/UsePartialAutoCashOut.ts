import { useEffect, useState } from "react";
import { Money, useParamSelector } from "@sb/utils";
import { minPartialAutoCashOutSelector } from "../Selectors/CashoutSelectors";

const usePartialAutoCashOut = (betId: string) => {
  const min = useParamSelector(minPartialAutoCashOutSelector, [betId]);

  const [amount, setAmount] = useState(Money.toUnit(min));

  const [money, setMoney] = useState(min);

  const handler = (normalized: string, input?: string) => {
    const nextMoney = Money.parseOrZero(normalized, money.currency);

    setMoney(nextMoney);

    setAmount(input === void 0 ? Money.toUnit(nextMoney) : input);
  };

  useEffect(
    () => {
      if(Money.greaterThan(min, money)) {
        handler(Money.toUnit(min));
      }
    },
    [min.amount, min.currency],
  );

  return [amount, money, handler];
};

export { usePartialAutoCashOut };
