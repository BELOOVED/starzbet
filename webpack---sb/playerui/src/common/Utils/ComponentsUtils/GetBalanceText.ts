import { EMoneyFormat, type IMoney, isNotNil, Money } from "@sb/utils";

const getBalanceText = (
  balance: IMoney | null | undefined,
  playerBalance?: IMoney | null | undefined,
  allowZero?: boolean,
) => {
  if (isNotNil(balance)) {
    return Money.toFormat(balance, EMoneyFormat.symbolLeft);
  }

  if (allowZero && isNotNil(playerBalance)) {
    const zero = Money.getZero(playerBalance.currency);

    return Money.toFormat(zero, EMoneyFormat.symbolLeft);
  }

  return null;
};

export { getBalanceText };
