import { memo } from "react";
import { useParamSelector } from "@sb/utils";
import { parametersByOutcomeIdSelector } from "../../Store/Feed/Selectors/OutcomeByIdSelector";
import {
  marketByIdSelector,
  outcomeTranslatesByIdSelector,
  participantsByEventIdSelector,
  scopeByMarketIdSelector,
  sportIdByEventIdSelector,
} from "../../Store/Feed/Selectors/FeedSelectors";
import { Ellipsis } from "../Ellipsis/Ellipsis";
import { PickName } from "../PickName/PickName";

type TEventOutcomeNameProps = {
  outcomeId: string;
  marketId: string;
  eventId: string;
}

const EventOutcomeName = memo<TEventOutcomeNameProps>(
  ({
    outcomeId,
    marketId,
    eventId,
  }) => {
    const parameters = useParamSelector(parametersByOutcomeIdSelector, [outcomeId]);
    const outcomeTranslates = useParamSelector(outcomeTranslatesByIdSelector, [outcomeId]);
    const market = useParamSelector(marketByIdSelector, [marketId]);
    const participants = useParamSelector(participantsByEventIdSelector, [eventId]);
    const scope = useParamSelector(scopeByMarketIdSelector, [marketId]);
    const sportId = useParamSelector(sportIdByEventIdSelector, [eventId]);

    return (
      <Ellipsis>
        <PickName
          marketType={market.type}
          marketParameters={market.parameters}
          participants={participants}
          outcomeParameters={parameters}
          name={outcomeTranslates}
          scope={scope}
          sportId={sportId}
        />
      </Ellipsis>
    );
  },
);
EventOutcomeName.displayName = "EventOutcomeName";

export { EventOutcomeName };
