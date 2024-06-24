import { createElement, memo } from "react";
import { isNotNil, useParamSelector } from "@sb/utils";
import { type EMarketType } from "@sb/betting-core/MarketType";
import classes from "./PickInfo.module.css";
import { DateFormat } from "../../../../../../../../../common/Components/Date/DateFormat";
import {
  marketTypeByIdSelector,
  outrightByIdSelector,
  scopeByMarketIdSelector,
  sportIdByEventIdSelector,
} from "../../../../../../../../Store/Feed/Selectors/FeedSelectors";
import { marketTypeWithCustomNameMap } from "../../../../../../../../Components/Kiron/BetSlipPick/MarketTypeWithCustomNameMap";
import { MarketName } from "../../../../../../../../Components/MarketName/MarketName";
import { sportIdsWithoutScope } from "../../../../../../../../Store/Virtual/Common/Model/SportIdWithoutScope";
import { ShortScopeName } from "../../../../../../../../Components/ScopeName/ScopeName";
import { OutrightName } from "../../../../../../../../Components/OutrightName/OutrightName";
import { EventName } from "../EventName/EventName";
import { EventStatus } from "../EventStatus/EventStatus";
import { type TWithEventId, type TWithLive, type TWithMarketId, type TWithOutcomeId, type TWithOutrightId } from "../TBetConstructorContent";

type  TMarketProps = TWithMarketId & TWithEventId & TWithOutcomeId

const Market = memo<TMarketProps>(
  ({ marketId, eventId, outcomeId }) => {
    const scope = useParamSelector(scopeByMarketIdSelector, [marketId]);
    const sportId: string = useParamSelector(sportIdByEventIdSelector, [eventId]);
    const marketType: EMarketType = useParamSelector(marketTypeByIdSelector, [marketId]);
    const customNameMarket = marketTypeWithCustomNameMap[marketType];

    return (
      <div className={classes.marketName}>
        {
          isNotNil(customNameMarket)
            ? createElement(customNameMarket, { outcomeId, marketId })
            : (
              <MarketName id={marketId} />
            )
        }

        {
          !sportIdsWithoutScope.includes(sportId) && (
            <ShortScopeName
              scope={scope}
              sportId={sportId}
              pattern={" (@)"}
            />
          )
        }
      </div>
    );
  },
);
Market.displayName = "Market";

type TEventInfoProps = TWithMarketId & TWithEventId & TWithOutcomeId & TWithLive

const EventInfo = memo<TEventInfoProps>(({
  marketId,
  eventId,
  outcomeId,
  live,
}) => (
  <>
    <Market marketId={marketId} eventId={eventId} outcomeId={outcomeId} />

    <div className={classes.nameAndStatus}>
      <EventName eventId={eventId} live={live} />

      <EventStatus eventId={eventId} live={live} />
    </div>
  </>
));
EventInfo.displayName = "EventInfo";

const OutrightInfo = memo<TWithOutrightId>(({ outrightId }) => {
  const { startTime } = useParamSelector(outrightByIdSelector, [outrightId]);

  return (
    <>
      <div className={classes.marketName}>
        <OutrightName id={outrightId} />
      </div>

      <div className={classes.outrightStatus}>
        <DateFormat date={startTime} format={"HH:mm • E, do MMMM"} />
      </div>
    </>
  );
});
OutrightInfo.displayName = "OutrightInfo";

type TPickInfoProps = TEventInfoProps & Partial<TWithOutrightId>
const PickInfo = memo<TPickInfoProps>((
  { outrightId, ...rest },
) => (
  <div className={classes.pickInfo}>
    {
      isNotNil(outrightId)
        ? <OutrightInfo outrightId={outrightId} />
        : <EventInfo {...rest} />
    }
  </div>
));
PickInfo.displayName = "PickInfo";

export { PickInfo };
