// @ts-nocheck
import { createElement, memo, useMemo, useReducer } from "react";
import { useSelector } from "react-redux";

const AbstractContainer = memo(({
  selectorFactory,
  deps = [],
  listView,
  ...rest
}) => {
  // @react-compiler-warn
  const selector = useMemo(() => selectorFactory(deps), deps);

  const entries = useSelector(selector);

  return createElement(listView, { entries, ...rest });
});
AbstractContainer.displayName = "AbstractContainer";

const getNextEntriesBySport = (entries, limit): any => {
  let currentSize = 0;
  let limited = false;

  const nextEntries = [];

  entries.forEach(([sportId, tournamentEntries]) => {
    const nextTournamentEntries = [];

    tournamentEntries.forEach((tournamentEntry) => {
      const [tournamentId, eventIdList] = tournamentEntry;

      if (currentSize + eventIdList.length <= limit) {
        currentSize = currentSize + eventIdList.length;

        nextTournamentEntries.push(tournamentEntry);

        return;
      }

      limited = true;

      const allowableSize = limit - currentSize;

      if (allowableSize === 0) {
        return;
      }

      currentSize = currentSize + allowableSize;

      nextTournamentEntries.push([tournamentId, eventIdList.slice(0, allowableSize)]);
    });

    if (nextTournamentEntries.length !== 0) {
      nextEntries.push([sportId, nextTournamentEntries]);
    }
  });

  return [limited, nextEntries];
};

const getNextEntriesByTournament = (entries, limit) => {
  let currentSize = 0;
  let limited = false;

  const nextEntries = [];

  entries.forEach((tournamentEntry) => {
    const [tournamentId, eventIdList] = tournamentEntry;

    if (currentSize + eventIdList.length <= limit) {
      currentSize = currentSize + eventIdList.length;

      nextEntries.push(tournamentEntry);

      return;
    }

    limited = true;

    const allowableSize = limit - currentSize;

    if (allowableSize === 0) {
      return;
    }

    currentSize = currentSize + allowableSize;

    nextEntries.push([tournamentId, eventIdList.slice(0, allowableSize)]);
  });

  return [limited, nextEntries];
};

const AbstractContainerWithLimit = memo(({
  selectorFactory,
  deps = [],
  listView,
  offset = 20,
  button,
  entryWalker,
  ...rest
}) => {
  const [limit, handler] = useReducer((prev) => prev + offset, offset, undefined);

  const selector = useMemo(() => selectorFactory(deps), deps);

  const entries = useSelector(selector);

  const [limited, nextEntries] = useMemo(() => entryWalker(entries, limit), [entries, limit]);

  return (
    <div>
      {createElement(listView, { entries: nextEntries, ...rest })}

      {
        limited && (
          createElement(button, { handler })
        )
      }
    </div>
  );
});
AbstractContainerWithLimit.displayName = "AbstractContainerWithLimit";

export {
  AbstractContainer,
  AbstractContainerWithLimit,
  getNextEntriesBySport,
  getNextEntriesByTournament,
};
