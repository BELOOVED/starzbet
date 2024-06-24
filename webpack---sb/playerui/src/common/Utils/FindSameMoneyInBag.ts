import { type IMoney, type IMoneyBag, Money } from "@sb/utils";

const findSameMoneyInBag = (money: IMoney, moneyBag: IMoneyBag) => {
  if (Money.isSameCurrency(money, moneyBag.system)) {
    return moneyBag.system;
  }

  return moneyBag.additional.find((additional) => Money.isSameCurrency(money, additional));
};

export { findSameMoneyInBag };
