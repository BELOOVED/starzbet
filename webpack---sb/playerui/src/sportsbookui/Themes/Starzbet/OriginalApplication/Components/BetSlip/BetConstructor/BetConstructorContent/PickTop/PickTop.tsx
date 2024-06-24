import { memo } from "react";
import classes from "./PickTop.module.css";
import { OutrightOutcomeName } from "../../../../../../../../Components/OutrightOutcomeName/OutrightOutcomeName";
import { EventOutcomeName } from "../../../../../../../../Components/EventOutcomeName/EventOutcomeName";
import { useBetSlipDisablePickAction } from "../../../../../../../../Store/BetSlip/Hooks/UseBetSlipDisablePickAction";
import { BetConstructorPickCoefficient } from "../../../Pick/PickCoefficient/PickCoefficient";
import { BetConstructorCheckbox } from "../../BetConstructorCheckbox/BetConstructorCheckbox";
import { type TWithDisable, type TWithEventId, type TWithMarketId, type TWithOutcomeId, type TWithOutrightId } from "../TBetConstructorContent";
import { CloseButton } from "./CloseButton/CloseButton";

type  TPickTopProps = TWithDisable & TWithEventId & TWithOutcomeId & TWithOutrightId & TWithMarketId
const PickTop = memo<TPickTopProps>(({
  outcomeId,
  eventId,
  marketId,
  outrightId,
  disable,
}) => {
  const disablePickAction = useBetSlipDisablePickAction(outcomeId, !disable);

  return (
    <div className={classes.pickTop}>
      <BetConstructorCheckbox checked={!disable} onChange={disablePickAction} />

      <div className={classes.outcomeName}>
        {
          outrightId
            ? (

              <OutrightOutcomeName id={outcomeId} />

            )
            : (
              <EventOutcomeName
                outcomeId={outcomeId}
                eventId={eventId}
                marketId={marketId}
              />
            )
        }
      </div>

      <BetConstructorPickCoefficient outcomeId={outcomeId} />

      <CloseButton outcomeId={outcomeId} />
    </div>
  );
});
PickTop.displayName = "PickTop";

export { PickTop };
