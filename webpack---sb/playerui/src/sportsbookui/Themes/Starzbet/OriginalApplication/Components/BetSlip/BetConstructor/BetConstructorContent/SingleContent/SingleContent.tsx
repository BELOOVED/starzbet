import { Fragment, memo } from "react";
import { useSelector } from "react-redux";
import { EMoneyFormat, getNotNil, Money, useParamSelector } from "@sb/utils";
import { sportsbookui_starzbet_betSlip_bet_estReturn } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./SingleContent.module.css";
import { coefficientByOutcomeIdSelector } from "../../../../../../../../Store/Feed/Selectors/OutcomeByIdSelector";
import { betSlipPicksSelector } from "../../../../../../../../Store/BetSlip/Selectors/BetSlipPicksSelectors";
import { useSingleStakeByIdSelector } from "../../../../../../../../Store/BetSlip/Hooks/UseSingleStakeByIdSelector";
import { MatchNotActiveBonusLabelForSingle } from "../../../Bonus/MatchNotActiveBonusLabel/MatchNotActiveBonusLabel";
import { FreeBetCheckBox } from "../../../Bonus/FreeBetCheckbox/FreeBetCheckbox";
import { BonusBetCheckBox } from "../../../Bonus/BonusBetCheckBox/BonusBetCheckBox";
import { OddsBoostCheckBox } from "../../../Bonus/OddsBoostCheckBox/OddsBoostCheckBox";
import { StakeInputForSingle } from "../../BetConstructorBottom/StakeInput/StakeInput";
import { BetConstructorTextBlock } from "../../BetConstructorTextBlock/BetConstructorTextBlock";
import { PickContainer } from "../PickContainer/PickContainer";
import { PickTop } from "../PickTop/PickTop";
import { PickInfo } from "../PickInfo/PickInfo";
import { type TWithEventId, type TWithMarketId, type TWithOutrightId } from "../TBetConstructorContent";

type TWithOutcomeId = {
  outcomeId: string;
}

const StakeBlock = memo<TWithOutcomeId>(({ outcomeId }) => {
  const coefficient = useParamSelector(coefficientByOutcomeIdSelector, [outcomeId]);

  const { money } = getNotNil(
    useSingleStakeByIdSelector(outcomeId),
    ["StakeBlock"],
    "useSingleStakeByIdSelector",
  );

  const textBlockProps = {
    title: [sportsbookui_starzbet_betSlip_bet_estReturn] as const,
    subtitle: [Money.toFormat(Money.multiply(money, Number(coefficient)), EMoneyFormat.symbolLeft)] as const,
  };

  return (
    <div className={classes.stakeBlock}>
      <StakeInputForSingle outcomeId={outcomeId} />

      <BetConstructorTextBlock {...textBlockProps} />
    </div>
  );
});
StakeBlock.displayName = "StakeBlock";

type TSinglePickProps = TWithOutcomeId & TWithEventId & TWithMarketId & TWithOutrightId

const SinglePick = memo<TSinglePickProps>((props) => (
  <PickContainer outcomeId={props.outcomeId}>
    {
      (live: boolean, disable: boolean) => (
        <>
          <PickTop {...props} disable={disable} />

          <PickInfo {...props} live={live} />

          <MatchNotActiveBonusLabelForSingle outcomeId={props.outcomeId} className={classes.singleHint} />

          <StakeBlock outcomeId={props.outcomeId} />
        </>
      )
    }
  </PickContainer>
));
SinglePick.displayName = "SinglePick";
const SingleContent = memo(() => {
  const picks = useSelector(betSlipPicksSelector);

  return (
    <>
      {
        picks.map((
          {
            eventId,
            outcomeId,
            marketId,
            outrightId,
          },
          idx,
        ) => (
          <Fragment key={`${idx}:${outcomeId}`}>
            <SinglePick
              outcomeId={outcomeId}
              eventId={eventId}
              marketId={marketId}
              outrightId={outrightId}
            />

            <FreeBetCheckBox outcomeId={outcomeId} />

            <BonusBetCheckBox outcomeId={outcomeId} />

            <OddsBoostCheckBox outcomeId={outcomeId} />
          </Fragment>
        ))
      }
    </>
  );
});
SingleContent.displayName = "SingleContent";

export { SingleContent };
