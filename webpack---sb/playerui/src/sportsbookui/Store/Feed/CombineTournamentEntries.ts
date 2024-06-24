import { type IFlatEvent, type TVersionedRecord } from "@sb/betting-core/Feed/Types";
import { getNotNil } from "@sb/utils";

type TSortFn = (events: Record<string, IFlatEvent>) => (list: string[]) => string[];
type TGroupFn = (events: Record<string, IFlatEvent>, list: string[]) => [string, string[]][];

const combineTournamentEntries = ([sortFn, groupFn]: [TSortFn | undefined, TGroupFn | undefined]) =>
  (tournamentIdList: string[], events: Record<string, IFlatEvent>, tournamentToEventMap: TVersionedRecord<string[]>) => {
    const eventIdList: string[] = [];

    tournamentIdList.forEach((tournamentId) => {
      const tournament = tournamentToEventMap[tournamentId];
      if (tournament) {
        eventIdList.push(
          ...tournament.filter((id) => events.hasOwnProperty(id)),
        );
      }
    });

    return getNotNil(groupFn, ["combineTournamentEntries"], "groupFn")(events, sortFn ? sortFn(events)(eventIdList) : eventIdList);
  };

export { combineTournamentEntries };
