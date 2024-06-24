import { ascend, createMemoSelector, descend, getNotNil, type TExplicitAny, type TSelector } from "@sb/utils";
import { type IFlatEvent, type IFlatTournament } from "@sb/betting-core/Feed/Types";
import { baseSortWith } from "../../../Utils/SortWith";
import { eventsSelector, tournamentsSelector } from "../../Feed/Selectors/FeedSelectors";
import { preLiveEventsFilteredSelector } from "../../Feed/Selectors/PreLiveEventsSelector";
import { liveEventsSelector } from "../../Feed/Selectors/LiveEventsSelector";
import { type IWithFeed } from "../../Feed/FeedState";

type TCurrentEventSelector<P extends TExplicitAny[] = []> = TSelector<IWithFeed, Record<string, IFlatEvent>, P>

const createTournamentMapSelectorFactory =
  <P extends TExplicitAny[] = []>(currentEventSelector: TCurrentEventSelector<P>) => createMemoSelector(
    [
      tournamentsSelector,
      currentEventSelector,
      (_, categoryId: string) => categoryId,
    ],
    (tournaments, events, categoryId) => {
      const map: Record<string, null> = {};

      const setTournamentId = ({ tournamentId }: IFlatEvent) => {
        if (tournaments[tournamentId]?.categoryId !== categoryId) {
          return;
        }

        map[tournamentId] = null;
      };

      Object.values(events).forEach(setTournamentId);

      return map;
    },
  );

const getNotNilTournament = (tournament: IFlatTournament | undefined) =>
  getNotNil(tournament, ["TournamentListByCategoryIdSelector"], "tournament");

const combine = (tournamentMap: Record<string, null>, tournaments: Record<string, IFlatTournament>) => (
  baseSortWith(
    [
      descend((tournamentId) => getNotNilTournament(tournaments[tournamentId]).priority),
      ascend((tournamentId) => getNotNilTournament(tournaments[tournamentId]).name),
    ],
    Object.keys(tournamentMap),
  )
);

const preLiveTournamentIdListByCategoryIdSelector = createMemoSelector(
  [
    createTournamentMapSelectorFactory(preLiveEventsFilteredSelector),
    tournamentsSelector,
  ],
  combine,
);

const liveTournamentIdListByCategoryIdSelector = createMemoSelector(
  [
    createTournamentMapSelectorFactory(liveEventsSelector),
    tournamentsSelector,
  ],
  combine,
);

const allTournamentIdListByCategoryIdSelector = createMemoSelector(
  [
    createTournamentMapSelectorFactory(eventsSelector),
    tournamentsSelector,
  ],
  combine,
);

export {
  allTournamentIdListByCategoryIdSelector,
  liveTournamentIdListByCategoryIdSelector,
  preLiveTournamentIdListByCategoryIdSelector,
};
