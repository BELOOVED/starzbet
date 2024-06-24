// @ts-nocheck
import { createElement, memo } from "react";
import { withRegistry } from "@bem-react/di";
import { isFinished } from "@sb/betting-core/EEventStatusUtils";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { useParamSelector } from "@sb/utils";
import { PickName as PickNameBase } from "../../../../../../../Components/PickName/PickName";
import { MarketNameByParams } from "../../../../../../../Components/MarketName/MarketName";
import { ShortScopeName as ShortScopeNameBase } from "../../../../../../../Components/ScopeName/ScopeName";
import { videoUrlByEventIdSelector } from "../../../../../../../Store/Feed/Selectors/FeedSelectors";
import { marketTypeWithCustomNameMap } from "../../../../../../../Components/Kiron/BetPick/MarketTypeWithCustomNameMap";
import { sportIdsWithoutScope } from "../../../../../../../Store/Virtual/Common/Model/SportIdWithoutScope";
import { isVirtual } from "../../../../../../../Store/Feed/Model/Sport";
import { type IDeprecatedEventInfoFromFS } from "../../../../../../../Model/Bet";
import { virtualRacingSport } from "../../../../../../../Store/Virtual/Common/Model/VirtualRacingSport";
import { BetTeams } from "../../BetTeams/BetTeams";
import { EventStatus as EventStatusBase } from "../../Bet/BaseBet/EventStatus/EventStatus";
import { eventPickRegistry } from "../PickRegistry";
import { BaseEventPick } from "../BasePick/BaseEventPick";
import { EventNameWithNumber } from "./EventNameWithNumber/EventNameWithNumber";

const normalizeScore = (eventInfo: IDeprecatedEventInfoFromFS, sportId: string) => {
  const scopes = eventInfo.scopes;
  if (!scopes) {
    return undefined;
  }
  const fullEvent0Scores = scopes["full_event--0"]?.scores;

  if (isVirtual(sportId)) {
    if (!isFinished(eventInfo.eventStatus)) {
      return undefined;
    }

    if ([...virtualRacingSport, sportCodeToIdMap[ESportCode.kiron_racing_roulette]].includes(sportId)) {
      return fullEvent0Scores?.place_number;
    }
  }

  if (sportId === sportCodeToIdMap[ESportCode.kiron_soccer]) {
    return scopes["normal_time--0"]?.scores?.score;
  }

  return fullEvent0Scores?.score;
};

const PickName = memo(({ market, event, outcome }) => createElement(
  PickNameBase,
  {
    marketType: market.type,
    marketParameters: market.parameters,
    participants: event.participants,
    outcomeParameters: outcome.parameters,
    name: outcome.translatesForManuallyCreated,
    scope: market.scope,
    sportId: event.sport.id,
  },
));
PickName.displayName = "PickName";

const MarketName = memo(({ market, event, outcome }) => {
  const marketType = market.type;
  const scope = market.scope;
  const participants = event.participants;
  const sportId = event.sport.id;

  return (
    marketTypeWithCustomNameMap[marketType]
      ? createElement(
        marketTypeWithCustomNameMap[marketType],
        {
          outcomeParameters: outcome.parameters,
          market,
          scope,
          participants,
          sportId,
        },
      )
      : (
        <MarketNameByParams
          market={market}
          scope={scope}
          participants={participants}
          sportId={sportId}
        />
      )
  );
});
MarketName.displayName = "MarketName";

const ShortScopeName = memo(({ market, event }) => {
  const sportId = event.sport.id;

  return (
    !sportIdsWithoutScope.includes(sportId) && (
      <ShortScopeNameBase
        scope={market.scope}
        sportId={sportId}
        pattern={" (@)"}
      />
    )
  );
});
ShortScopeName.displayName = "ShortScopeName";

const Teams = memo(({ event }) => {
  const sportId = event.sport.id;
  const participants = event.participants;

  if (isVirtual(sportId)) {
    return (
      <EventNameWithNumber sportId={sportId} eventFullName={event.name} participants={participants} />
    );
  }

  return (
    <BetTeams eventId={event.id} participants={participants} />
  );
});
Teams.displayName = "Teams";

const EventStatus = memo(({ event, eventInfo }) => {
  const live = useParamSelector(videoUrlByEventIdSelector, [event.id]);

  return (
    <EventStatusBase
      startTime={event.startTime}
      eventInfo={eventInfo}
      score={normalizeScore(eventInfo, event.sport.id)}
      participants={event.participants}
      sportId={event.sport.id}
      eventId={event.id}
      live={live}
    />
  );
});
EventStatus.displayName = "EventStatus";

const fulfilledEventPickRegistry = eventPickRegistry().fill({
  PickName,
  MarketName,
  ShortScopeName,
  Teams,
  EventStatus,
});

const EventPickFromFS = withRegistry(fulfilledEventPickRegistry)(BaseEventPick);
EventPickFromFS.displayName = "EventPickFromFS";

export { EventPickFromFS };
