import { type IFlatEvent, type IFlatOutright, type TVersionedRecord } from "@sb/betting-core/Feed/Types";
import { baseSortWith } from "../../../Utils/SortWith";
import { ascend } from "../../../Utils/Ascend";
import { partition } from "../../../Utils/Partition";
import { isFakeOutrightTournamentId, unfakeOutrightTournamentId } from "../../SportMenu/Model/SportMenu";

type TCombineByEvents =
  (ids: string[], events: Record<string, IFlatEvent>, tournamentToEventMap: TVersionedRecord<string[]>) => [string, string[]][]

type TFilterFn = (outright: IFlatOutright) => boolean

const combineTournamentEntriesWithOutrights = (combineByEvents: TCombineByEvents, filterFn: TFilterFn | undefined) => (
  tournamentIdList: string[],
  events: Record<string, IFlatEvent>,
  tournamentToEventMap: TVersionedRecord<string[]>,
  tournamentToOutrightMap: TVersionedRecord<string[]>,
  outrights: TVersionedRecord<IFlatOutright>,
) => {
  const [fakeIds, realIds] = partition(isFakeOutrightTournamentId, tournamentIdList);

  const entriesByEvents = combineByEvents(realIds, events, tournamentToEventMap);

  return fakeIds.reduce(
    (acc, fakeTournamentId) => {
      const outrightIds = tournamentToOutrightMap[unfakeOutrightTournamentId(fakeTournamentId)];

      if (!outrightIds) {
        return acc;
      }

      const filtered = filterFn
        ? outrightIds.filter((outrightId) => {
          const outright = outrights[outrightId];

          return outright ? filterFn(outright) : outrightIds;
        })
        : outrightIds;

      if (filtered.length === 0) {
        return acc;
      }

      const sorted = baseSortWith([ascend((id: string) => outrights[id]?.startTime)], filtered);

      const result: [string, string[]][] = [
        ...acc,
        [fakeTournamentId, sorted],
      ];

      return result;
    },
    entriesByEvents,
  );
};

export { combineTournamentEntriesWithOutrights };
