import { ascend, createMemoSelector, descend, getNotNil, type TSelector } from "@sb/utils";
import { type IFlatTournament, type TVersionedRecord } from "@sb/betting-core/Feed/Types";
import { baseSortWith } from "../../../Utils/SortWith";
import { getIndexTournamentIdInFavourites } from "../../../Utils/GetIndexTournamentIdInFavourites";
import { unfakeOutrightTournamentId } from "../../SportMenu/Model/SportMenu";
import { allPinnedEventsSelector } from "../../PreLive/Selectors/PreLiveSelectors";
import { type TAppState } from "../../InitialState";
import { sportsSelector, tournamentsSelector } from "./FeedSelectors";

const getNotNilTournament = (tournaments: TVersionedRecord<IFlatTournament>, tournamentId: string, ctx: string) => getNotNil(
  tournaments[unfakeOutrightTournamentId(tournamentId)],
  ["SortedTournamentEntriesSelectorFactory"],
  `Tournament by ${tournamentId} - ${ctx}`,
);

const sortedTournamentEntriesSelectorFactory =
  (
    favoritesSelector: TSelector<TAppState, string[]>,
    tournamentEntriesSelector: TSelector<TAppState, [string, string[]][]>,
    ctx: string,
  ) => (
    createMemoSelector(
      [
        tournamentsSelector,
        favoritesSelector,
        sportsSelector,
        tournamentEntriesSelector,
        allPinnedEventsSelector,
      ],

      (tournaments, favourites, sports, tournamentEntries, pinnedEvents) => baseSortWith(
        [
          ascend(
            ([_, eventIdList]: [unknown, string[]]) =>
              pinnedEvents && pinnedEvents.some((eventId) =>
                eventIdList.includes(eventId))
                ? 0
                : 1,
          ),
          ascend(([tournamentId]) => getIndexTournamentIdInFavourites(favourites, tournamentId)),
          descend(([tournamentId]) => getNotNil(
            sports[getNotNilTournament(tournaments, tournamentId, ctx).sportId],
            ["SortedTournamentEntriesSelectorFactory"],
            `Sport - ${ctx}`,
          ).priority),
          descend(([tournamentId]) => getNotNilTournament(tournaments, tournamentId, ctx).priority),
          ascend(([tournamentId]) => getNotNilTournament(tournaments, tournamentId, ctx).name),
        ],
        tournamentEntries,
      ),
    )
  );

export { sortedTournamentEntriesSelectorFactory };
