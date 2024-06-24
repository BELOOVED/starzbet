import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { ECurrencySymbol, type IMoney, Money, numberToComma } from "@sb/utils";
import { type TMoneyBag_Fragment } from "@sb/graphql-client";
import { playerCurrencySelector } from "../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { NumberRollingAfterUpdate } from "../../../common/Components/NumberRollingAfterUpdate";
import { findPlayerMoneyInBag } from "../../Utils/PlayerMoneyBag";

interface IVipClubTournamentPrizeProps {
  prize: TMoneyBag_Fragment | IMoney;
}

const VipClubTournamentPrize = memo<IVipClubTournamentPrizeProps>(({ prize }) => {
  const currency = useSelector(playerCurrencySelector);

  const prizeMoney = Money.isMoney(prize) ? prize : findPlayerMoneyInBag(prize, currency);

  const prizeNumber = Money.toNumber(prizeMoney);

  const formatFunction = useCallback(
    (displayNumber: number) =>
      `${numberToComma(displayNumber, 2)} ${ECurrencySymbol[currency]}`,
    [currency],
  );

  return <NumberRollingAfterUpdate targetNumber={prizeNumber} formatFunction={formatFunction} />;
});
VipClubTournamentPrize.displayName = "VipClubTournamentPrize";

export { VipClubTournamentPrize };
