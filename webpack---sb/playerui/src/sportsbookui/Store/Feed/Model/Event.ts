import { isCurrentEventMinuteValid } from "@sb/betting-core/IsCurrentEventMinuteValid";
import { type IFlatEvent, type IParticipant, type TParticipants } from "@sb/betting-core/Feed/Types";
import { getNotNil, type TNullable } from "@sb/utils";
import { type EParticipantShortId } from "@sb/betting-core/EParticipantShortId";
import { EParticipantType } from "@sb/betting-core/EParticipantType";
import { keys } from "@sb/utils/Keys";
import { sortWith } from "../../../Utils/SortWith";
import { ascend } from "../../../Utils/Ascend";
import { descend } from "../../../Utils/Descend";
import { includesString } from "../../../Utils/IncludesString";
import { getEventNameByEvent } from "../../MyBets/Model/GetEventNameByEvent";
import { isBaseSport, isEsport, isVirtual } from "./Sport";

type TSortIds = (ids: string[]) => string[];

const participantTypesDoubleTuple = [
  EParticipantType.team1,
  EParticipantType.team2,
] as const satisfies [EParticipantType, EParticipantType];

const getEvent = (events: Record<string, IFlatEvent>, eventId: string, ctx: string) =>
  getNotNil(events[eventId], ["getEvent", ctx, eventId], "event");

type TSortEvent = (events: Record<string, IFlatEvent>) => (ids: string[]) => string[];

const sortEventIdsByStartTimeAndName: TSortEvent = (events) => sortWith([
  ascend((eventId: string) => getEvent(events, eventId, "sortEventIdsByStartTimeAndName").startTime),
  ascend((eventId: string) => getEventNameByEvent(getEvent(events, eventId, "sortEventIdsByStartTimeAndName"))),
]) as unknown as TSortIds; // sort result extends number - refactor sortWith types

const sortEventIdsByFavourites = (favourites: string[]) => (events: Record<string, IFlatEvent>) => sortWith([
  descend((eventId) => favourites.indexOf(eventId as string)),
  ascend((eventId: string) => getEvent(events, eventId, "sortEventIdsByFavourites").startTime),
  ascend((eventId: string) => getEventNameByEvent(getEvent(events, eventId, "sortEventIdsByFavourites"))),
]) as unknown as TSortIds; // sort result extends number - refactor sortWith types

const equalBySportId = (sportId: string) => (event: IFlatEvent) => event.sportId === sportId;

type TGroupEvents = (events: Record<string, IFlatEvent>, eventIdList: string[]) => [string, string[]][]

const groupEventsByTournamentId: TGroupEvents = (events, eventIdList) => {
  // Record<tournamentId, eventId[]>
  const map: Record<string, string[]> = {};

  eventIdList.forEach((eventId) => {
    const event = events[eventId];

    if (!event) {
      return;
    }

    if (!map.hasOwnProperty(event.tournamentId)) {
      map[event.tournamentId] = [];
    }

    // verified above
    map[event.tournamentId]!.push(eventId);
  });

  return Object.entries(map);
};

const groupEventsBySportId = (events: Record<string, IFlatEvent>, eventIdList: string[]) => {
  // Record<sportId, Record<tournamentId, eventId[]>>
  const map: Record<string, Record<string, string[]>> = {};

  eventIdList.forEach((eventId) => {
    const event = getEvent(events, eventId, "groupEventsBySportId");

    const { sportId, tournamentId } = event;

    if (!map.hasOwnProperty(sportId)) {
      map[sportId] = {};
    }

    // verified above
    if (!map[sportId]!.hasOwnProperty(tournamentId)) {
      map[sportId]![tournamentId] = [];
    }

    // verified above
    map[sportId]![tournamentId]!.push(eventId);
  });

  return Object.entries(map).map(([parentId, entries]) => ([parentId, Object.entries(entries)]));
};

type TPartialFilter<Node> = (node: Node) => boolean

const batchEventFilters = <E extends IFlatEvent>(filters: TPartialFilter<E>[]) => (event: E) => filters.every((fn) => fn(event));
const getTeamShortIdList = (participants: TParticipants) => participantTypesDoubleTuple.map(
  (type) => getNotNil(participants[type], ["getTeamShortIdList"], "participant").shortId,
);

// incorrect generic, find case with team.id and correct it, mb not actual at all without gql Bet types
const getTeamList = <P extends IParticipant & IWithId>(
  participants: Record<EParticipantType, P>,
) => participantTypesDoubleTuple.map((type) => {
    const team = participants[type];

    return { ...team, teamId: team.teamId ? team.teamId : team.id };
  });

const getTeamListByOutcome = (participants: TParticipants, outcomes: string) => {
  const outcomeList = outcomes.split(",");

  return outcomeList.map((outcome) => Object.values(participants).find((it) => it.shortId === outcome));
};

const findTeamByShortId = (participants: TParticipants, shortId: EParticipantShortId) => Object
  .values(participants)
  .find((team) => team.shortId === shortId);

const findParticipantTypeByTeamShortId = (
  participants: TParticipants,
  shortId: EParticipantShortId,
) => keys(participants).find(
  (type) => getNotNil(participants[type], ["findParticipantTypeByTeamShortId"], "participant").shortId === shortId,
);

const findTeamNameBySearchText = (searchText: string) => <Node extends { name: string; }>({ name }: Node) => (
  includesString(name, searchText)
);

const isServer = (shortId: EParticipantShortId, server: TNullable<string>) => shortId === server;

// todo review before drop optional chaining
const hasViewMinute = (event: IFlatEvent) => (
  isCurrentEventMinuteValid(event?.extraInfo?.currentMinute, event.sportId)
);

/** @deprecated*/
const hasVideoUrl = (event: IFlatEvent) => !!event?.extraInfo?.videoUrl;

const isBaseSportEvent = ({ sportId }: IFlatEvent) => isBaseSport(sportId);

const isEsportEvent = ({ sportId }: IFlatEvent) => isEsport(sportId);

const isVirtualEvent = ({ sportId }: IFlatEvent) => isVirtual(sportId);

export {
  participantTypesDoubleTuple,
  sortEventIdsByStartTimeAndName,
  sortEventIdsByFavourites,
  equalBySportId,
  groupEventsByTournamentId,
  groupEventsBySportId,
  batchEventFilters,
  getTeamShortIdList,
  getTeamList,
  getTeamListByOutcome,
  findTeamByShortId,
  findParticipantTypeByTeamShortId,
  findTeamNameBySearchText,
  isServer,
  hasViewMinute,
  hasVideoUrl,
  isBaseSportEvent,
  isEsportEvent,
  isVirtualEvent,
  type TGroupEvents,
  type TSortEvent,
};
