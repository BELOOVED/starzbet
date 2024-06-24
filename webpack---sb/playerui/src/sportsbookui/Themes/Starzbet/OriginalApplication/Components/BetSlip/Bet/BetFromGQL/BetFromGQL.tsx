import { createElement, memo } from "react";
import { type IRegistryEntities, withRegistry } from "@bem-react/di";
import { EMoneyFormat, Money } from "@sb/utils";
import type { TSportsbook_Bet_Fragment } from "@sb/graphql-client/PlayerUI";
import { BetHashName } from "../../../../../../../Components/BetName/BetName";
import { getOddsBoostSize } from "../../../../../../../Store/OddsBoost/Model/OddsBoost";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { type TBetBoostSize } from "../../../../../../../Store/MyBets/Model/TBet";
import { FreeBetLabel } from "../../Bonus/BonusLabels/FreeBetLabel";
import { BonusLabel } from "../../Bonus/BonusLabels/BonusLabel";
import { PickFromGQL } from "../../Pick/Pick";
import { OddsBoostRow } from "../BaseBet/OddsBoostRow/OddsBoostRow";
import { BaseBet, HeaderTotalRow, type IBaseBetProps } from "../BaseBet/BaseBet";
import { betRegistry } from "../BetRegistry";

type TTotalStakeProps = Pick<TSportsbook_Bet_Fragment, "totalStake" | "betBonus">;
const TotalStake = memo<TTotalStakeProps>(({ totalStake, betBonus }) => {
  const freeBet = Money.notZeroAndValid(betBonus?.freeBetAmount);
  const bonusBet = Money.notZeroAndValid(betBonus?.bonusBetAmount);

  if (!freeBet && !bonusBet) {
    return <Ellipsis>{Money.toFormat(totalStake.external, EMoneyFormat.symbolLeft)}</Ellipsis>;
  }

  return (
    <>
      {freeBet && <FreeBetLabel />}

      {bonusBet && <BonusLabel />}

      <Ellipsis>
        {Money.toFormat(totalStake.external, EMoneyFormat.symbolLeft)}
      </Ellipsis>
    </>
  );
});
TotalStake.displayName = "TotalStake";

type TTotalPayoutProps = Pick<TSportsbook_Bet_Fragment, "totalPayout">;
const TotalPayout = memo<TTotalPayoutProps>(({ totalPayout }) => {
  if (Money.isZero(totalPayout.external)) {
    return null;
  }

  return (
    <HeaderTotalRow>
      {Money.toFormat(totalPayout.external, EMoneyFormat.symbolLeft)}
    </HeaderTotalRow>
  );
});
TotalPayout.displayName = "TotalPayout";

type TBetNameProps = Pick<TSportsbook_Bet_Fragment, "hash">;
const BetName = memo<TBetNameProps>(({ hash }) => createElement(BetHashName, { hash }));
BetName.displayName = "BetName";

type TPickListProps = Pick<TSportsbook_Bet_Fragment, "picks"> & { isDropDown: boolean; };
const PickList = memo<TPickListProps>(({ picks, isDropDown }) => (
  <>
    {picks.map((pick) => <PickFromGQL {...pick} key={pick.id} isDropDown={isDropDown} />)}
  </>
));
PickList.displayName = "PickList";

type TOddsBoostProps = Pick<TSportsbook_Bet_Fragment, "betOddsBoost" | "totalPotentialPayout" | "totalStake">;
const OddsBoost = memo<TOddsBoostProps>(({ betOddsBoost, totalPotentialPayout, totalStake }) => {
  if (!betOddsBoost) {
    return null;
  }

  return (
    <OddsBoostRow
      boost={getOddsBoostSize(Money.subtract(totalPotentialPayout.external, totalStake.external), betOddsBoost.size as TBetBoostSize)}
    />
  );
});
OddsBoost.displayName = "OddsBoost";

/**
 * todo should minus totalStake? now payout on bonus/freeBet wallet is full totalPotentialPayout
 * old: computePayoutByFreeBet(totalPotentialPayout, totalStake, true)
 */
type TEstimatedReturnsProps = Pick<TSportsbook_Bet_Fragment, "totalPotentialPayout">;
const EstimatedReturns = memo<TEstimatedReturnsProps>(({ totalPotentialPayout }) =>
  Money.toFormat(totalPotentialPayout.external, EMoneyFormat.symbolLeft));
EstimatedReturns.displayName = "EstimatedReturns";

const getBetRegistry = (extraRegistry: IRegistryEntities) => betRegistry().fill({
  TotalStake,
  BetName,
  TotalPayout,
  PickList,
  OddsBoost,
  EstimatedReturns,
  ...extraRegistry,
});

interface IBetFromGQLProps extends IBaseBetProps {
  extraRegistry?: IRegistryEntities;
}

const BetFromGQL = memo<IBetFromGQLProps>(({ extraRegistry = {}, ...betProps }) => {
  const registry = getBetRegistry(extraRegistry);
  const ExtendedBet = withRegistry(registry)(BaseBet);

  return (
    <ExtendedBet {...betProps} />
  );
});
BetFromGQL.displayName = "BetFromGQL";

export { BetFromGQL };
