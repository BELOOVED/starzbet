import { getNotNil, createSimpleSelector, deduplicate, isNil, Money } from "@sb/utils";
import { Logger } from "../../../common/Utils/Logger";
import { hasProfileAndWalletSelector } from "../../../common/Store/Player/Selectors/ProfileSelectors";
import { mainBalanceOrNullSelector } from "../../../common/Store/Player/Selectors/MainBalanceOrNullSelector";
import {
  bonusBalanceOrNullSelector,
  freebetBalanceOrNullSelector,
} from "../Bonuses/Selectors/BonusesSelectors";
import { type TPlatformAppState } from "../PlatformInitialState";

const sumBalanceSelector = createSimpleSelector(
  [
    mainBalanceOrNullSelector,
    bonusBalanceOrNullSelector,
    freebetBalanceOrNullSelector,
  ],
  (main, bonus, freeBet) => {
    const allBalance = [main, bonus, freeBet].filter(Boolean);

    const currencies = allBalance.map((it) => it.currency);

    if(deduplicate(currencies).length > 1) {
      Logger.error.selector("[sumBalanceSelector]", "Cannot sum different currencies");

      return main;
    }

    const currency = getNotNil(currencies[0], ["sumBalanceSelector"], "currency");

    const sum = Money.sum(Money.getZero(currency), ...allBalance);

    if(isNil(sum)){
      Logger.error.selector("[sumBalanceSelector]", "Cannot sum balances");

      return null;
    }

    return sum;
  },
);

const sumBalanceOrNullSelector = (state: TPlatformAppState) =>
  hasProfileAndWalletSelector(state)
    ? sumBalanceSelector(state)
    : null;

export { sumBalanceOrNullSelector };
