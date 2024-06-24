import { createElement, memo } from "react";
import { useSelector } from "react-redux";
import { withRegistry } from "@bem-react/di";
import { EMoneyFormat, Money } from "@sb/utils";
import {
  editingByBetIdSelector,
  payoutByBetIdSelector,
} from "../../../../../../../Store/MyBets/Selectors/MyBetsSelectors";
import { BetName as BetNameBase } from "../../../../../../../Components/BetName/BetName";
import { BetOddsBoost } from "../../../../../../../Components/BetOddsBoost/BetOddsBoost";
import { type IDeprecatedBetFromFS } from "../../../../../../../Model/Bet";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { FreeBetLabel } from "../../Bonus/BonusLabels/FreeBetLabel";
import { BonusLabel } from "../../Bonus/BonusLabels/BonusLabel";
import { PickFromFS } from "../../Pick/Pick";
import { OddsBoostRow } from "../BaseBet/OddsBoostRow/OddsBoostRow";
import { BaseBet } from "../BaseBet/BaseBet";
import { betRegistry } from "../BetRegistry";
import { EditBetButton } from "./EditBetButton/EditBetButton";
import { EditingContent } from "./EditingContent/EditingContent";
import { BetHistory } from "./BetHistory/BetHistory";
import { BetTotalTitle } from "./BetTotalTitle/BetTotalTitle";
import { BetTotalExtraContent } from "./BetTotalExtraContent/BetTotalExtraContent";
import { BetFooter } from "./BetFooter/BetFooter";

type TTotalStakeProps = Pick<IDeprecatedBetFromFS, "totalStake" | "betBonus">;
const TotalStake = memo<TTotalStakeProps>(({ totalStake, betBonus }) => {
  const freeBet = Money.notZeroAndValid(betBonus?.freeBetAmount);
  const bonusBet = Money.notZeroAndValid(betBonus?.bonusBetAmount);

  if (!freeBet && !bonusBet) {
    return <Ellipsis>{Money.toFormat(totalStake, EMoneyFormat.symbolLeft)}</Ellipsis>;
  }

  return (
    <>
      {freeBet && <FreeBetLabel />}

      {bonusBet && <BonusLabel />}

      <Ellipsis>
        {Money.toFormat(totalStake, EMoneyFormat.symbolLeft)}
      </Ellipsis>
    </>
  );
});
TotalStake.displayName = "TotalStake";

type TTotalPayoutProps = Pick<IDeprecatedBetFromFS, "totalPayout">;
const TotalPayout = memo<TTotalPayoutProps>(({ totalPayout }) => (
  <>{Money.toFormat(totalPayout, EMoneyFormat.symbolLeft)}</>
));
TotalPayout.displayName = "TotalPayout";

type TBetNameProps = Pick<IDeprecatedBetFromFS, "id">;
const BetName = memo<TBetNameProps>(({ id }) => createElement(BetNameBase, { id }));
BetName.displayName = "BetName";

type TPickListProps = Pick<IDeprecatedBetFromFS, "picks" | "id"> & { isDropDown: boolean; };
const PickList = memo<TPickListProps>(({ picks, id, isDropDown }) => {
  const editing = useSelector(editingByBetIdSelector(id));
  if (editing) {
    return null;
  }

  return (
    <>
      {picks.map((pick) => <PickFromFS {...pick} key={pick.id} isDropDown={isDropDown} />)}
    </>
  );
});
PickList.displayName = "PickList";

const OddsBoost = memo<IWithId>(({ id }) => {
  const editing = useSelector(editingByBetIdSelector(id));

  return (
    <BetOddsBoost
      betId={id}
      isEditing={editing}
    >
      {(boost) => <OddsBoostRow boost={boost} />}
    </BetOddsBoost>
  );
});
OddsBoost.displayName = "OddsBoost";

const EstimatedReturns = memo<IWithId>(({ id }) => {
  const potentialReturns = useSelector(payoutByBetIdSelector(id));

  return Money.toFormat(potentialReturns, EMoneyFormat.symbolLeft);
});
EstimatedReturns.displayName = "EstimatedReturns";

const fulfilledBetRegistry = betRegistry().fill({
  TotalStake,
  BetName,
  TotalPayout,
  EditBetButton,
  PickList,
  EditingContent,
  BetHistory,
  BetTotalTitle,
  BetTotalExtraContent,
  BetFooter,
  OddsBoost,
  EstimatedReturns,
});

const BetFromFS = withRegistry(fulfilledBetRegistry)(BaseBet);
BetFromFS.displayName = "BetFromFS";

export { BetFromFS };
