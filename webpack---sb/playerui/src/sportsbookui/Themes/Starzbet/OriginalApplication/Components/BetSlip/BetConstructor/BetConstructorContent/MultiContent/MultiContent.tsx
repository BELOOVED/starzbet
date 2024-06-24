import { memo } from "react";
import { useSelector } from "react-redux";
import { betSlipPicksSelector } from "../../../../../../../../Store/BetSlip/Selectors/BetSlipPicksSelectors";
import { PickContainer } from "../PickContainer/PickContainer";
import { PickTop } from "../PickTop/PickTop";
import { PickInfo } from "../PickInfo/PickInfo";
import { type TWithEventId, type TWithMarketId, type TWithOutcomeId, type TWithOutrightId } from "../TBetConstructorContent";

type TMultiPickProps = TWithOutcomeId & TWithEventId & TWithMarketId & TWithOutrightId

const MultiPick = memo<TMultiPickProps>(
  (props) => (
    <PickContainer outcomeId={props.outcomeId}>
      {
        (live, disable) => (
          <>
            <PickTop {...props} disable={disable} />

            <PickInfo {...props} live={live} />
          </>
        )
      }
    </PickContainer>
  ),
);
MultiPick.displayName = "MultiPick";

const MultiContent = memo(() => {
  const picks = useSelector(betSlipPicksSelector);

  return (
    <>
      {
        picks.map((
          {
            outcomeId,
            eventId,
            marketId,
            outrightId,
          },
          idx,
        ) => (
          <MultiPick
            outcomeId={outcomeId}
            eventId={eventId}
            marketId={marketId}
            outrightId={outrightId}
            key={`${idx}:${outcomeId}`}
          />
        ))
      }
    </>
  );
});
MultiContent.displayName = "MultiContent";

export { MultiContent };
