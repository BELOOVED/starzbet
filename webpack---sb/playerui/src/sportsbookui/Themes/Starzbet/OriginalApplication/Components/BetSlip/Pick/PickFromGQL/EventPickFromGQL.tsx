import { createElement, memo } from "react";
import { withRegistry } from "@bem-react/di";
import {
  type TSportsbook_Event_Fragment,
  type TSportsbook_EventInfo_Fragment,
  type TSportsbook_Participant_Fragment,
  type TSportsbook_Score_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { type TParticipants } from "@sb/betting-core/Feed/Types";
import {
  composeHasPathParsers,
  parseEventId,
  parseScopeId,
  parseScopeNumber,
  parseScopeType,
  parseScoreType,
} from "@sb/betting-core/ParseHashPath";
import { EScopeType } from "@sb/betting-core/EScopeType";
import { isEmpty } from "@sb/utils";
import { isFinished } from "@sb/betting-core/EEventStatusUtils";
import { EScoreType } from "@sb/betting-core/EScoreType";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { type INormalizedEventPick } from "../../../../../../../../common/Utils/NormalizePick";
import { PickName as PickNameBase } from "../../../../../../../Components/PickName/PickName";
import { MarketNameByParams } from "../../../../../../../Components/MarketName/MarketName";
import { ShortScopeName as ShortScopeNameBase } from "../../../../../../../Components/ScopeName/ScopeName";
import { type TDeprecatedScoreFromFS } from "../../../../../../../Model/Bet";
import { isVirtual } from "../../../../../../../Store/Feed/Model/Sport";
import { virtualRacingSport } from "../../../../../../../Store/Virtual/Common/Model/VirtualRacingSport";
import { TeamsByFeed } from "../../BetTeams/BetTeams";
import { EventStatus as EventStatusBase } from "../../Bet/BaseBet/EventStatus/EventStatus";
import { eventPickRegistry } from "../PickRegistry";
import { BaseEventPick } from "../BasePick/BaseEventPick";

const normalizeEventParticipants = (participants: TSportsbook_Participant_Fragment[]) =>
  participants.reduce<TParticipants>(
    (acc, it) => {
      const [teamId, key] = it.id.split(":");

      return ({ ...acc, [key]: { teamId, name: it.team.name, shortId: it.shortId } });
    },
    {},
  );

const scoreHashPathParser = composeHasPathParsers(
  parseEventId,
  parseScopeId,
  parseScopeType,
  parseScopeNumber,
  parseScoreType,
);

const toScoreMap = (scores: TSportsbook_Score_Fragment[]) => scores.reduce<TDeprecatedScoreFromFS>(
  (acc, it) => ({ ...acc, [it.participantShortId]: it.value.value }),
  {},
);

const normalizeScore = (eventInfo: TSportsbook_EventInfo_Fragment, sportId: string): TDeprecatedScoreFromFS | undefined => {
  const normalizedScores = eventInfo.scores.map((it) => ({ ...it, ...scoreHashPathParser(it.hashPath) }));

  const fullEvent0Scores = normalizedScores.filter((it) => it.scopeType === EScopeType.full_event && it.scopeNumber === 0);

  if (isVirtual(sportId)) {
    if (!isFinished(eventInfo.eventStatus)) {
      return undefined;
    }

    if ([...virtualRacingSport, sportCodeToIdMap[ESportCode.kiron_racing_roulette]].includes(sportId)) {
      return toScoreMap(
        fullEvent0Scores.filter((it) => it.scoreType === EScoreType.place_number),
      );
    }
  }

  if (sportId === sportCodeToIdMap[ESportCode.kiron_soccer]) {
    return toScoreMap(
      normalizedScores.filter((it) => it.scopeType === EScopeType.normal_time && it.scopeNumber === 0),
    );
  }

  const normalizedScore = toScoreMap(fullEvent0Scores);

  return isEmpty(normalizedScore) ? undefined : normalizedScore;
};

const normalizeEvent = (event: TSportsbook_Event_Fragment) => ({
  id: event.id,
  status: event.eventStatus,
  sportId: event.sport.id,
  participants: normalizeEventParticipants(event.participant),
});

const PickName = memo<INormalizedEventPick>(({ market, event, outcome }) => createElement(
  PickNameBase,
  {
    marketType: market.type,
    marketParameters: market.parameters,
    participants: normalizeEventParticipants(event.participant),
    outcomeParameters: outcome.parameters,
    scope: market.scopeParameters,
    sportId: event.sport.id,
    name: outcome.translatesForManuallyCreated,
  },
));
PickName.displayName = "PickName";

type TMarketNameProps = Pick<INormalizedEventPick, "market" | "event">

const MarketName = memo<TMarketNameProps>(({ market, event }) => createElement(
  MarketNameByParams,
  {
    scope: market.scopeParameters,
    market,
    participants: normalizeEventParticipants(event.participant),
    sportId: event.sport.id,
  },
));
MarketName.displayName = "MarketName";

type TShortScopeNameProps = Pick<INormalizedEventPick, "market" | "event">

const ShortScopeName = memo<TShortScopeNameProps>(({ market, event }) => createElement(
  ShortScopeNameBase,
  {
    scope: market.scopeParameters,
    sportId: event.sport.id,
    pattern: " (@)",
  },
));
ShortScopeName.displayName = "ShortScopeName";

type TTeamsProps = Pick<INormalizedEventPick, "event"> & IWithClassName

const Teams = memo<TTeamsProps>(({ event, className }) => createElement(
  TeamsByFeed,
  {
    event: normalizeEvent(event),
    className,
  },
));
Teams.displayName = "Teams";

type TEventStatusProps = Pick<INormalizedEventPick, "event" | "eventInfo">

const EventStatus = memo<TEventStatusProps>(({ event, eventInfo }) => createElement(
  EventStatusBase,
  {
    startTime: event.startTime,
    eventInfo: eventInfo,
    score: normalizeScore(eventInfo, event.sport.id),
    participants: normalizeEventParticipants(event.participant),
    sportId: event.sport.id,
    eventId: event.id,
    live: false,
  },
));
EventStatus.displayName = "EventStatus";

const fulfilledEventPickRegistry = eventPickRegistry().fill({
  PickName,
  MarketName,
  ShortScopeName,
  Teams,
  EventStatus,
});

const EventPickFromGQL = withRegistry(fulfilledEventPickRegistry)(BaseEventPick);
EventPickFromGQL.displayName = "EventPickFromGQL";

export { EventPickFromGQL };
