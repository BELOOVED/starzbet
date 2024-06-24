import { type BasePick, type VirtualGamePick } from "./BetPick";

const isConflictedPick = (picks: (BasePick | VirtualGamePick)[], outcomeId: string) => {
  const pick = picks.find((pick) => pick.outcomeId === outcomeId);

  if (!pick) {
    return false;
  }

  if (pick.eventId) {
    const map = {};

    picks.forEach(({ outcomeId, eventId }) => {
      if (!map.hasOwnProperty(eventId)) {
        map[eventId] = [];
      }

      map[eventId].push(outcomeId);
    });

    return (
      map[pick.eventId].length > 1 && picks.length > map[pick.eventId].length
    );
  }

  if (pick.outrightId) {
    const map = {};

    picks.forEach(({ outcomeId, outrightId }) => {
      if (!map.hasOwnProperty(outrightId)) {
        map[outrightId] = [];
      }

      map[outrightId].push(outcomeId);
    });

    return (
      map[pick.outrightId].length > 1 && picks.length > map[pick.outrightId].length
    );
  }

  return false;
};

export { isConflictedPick };
