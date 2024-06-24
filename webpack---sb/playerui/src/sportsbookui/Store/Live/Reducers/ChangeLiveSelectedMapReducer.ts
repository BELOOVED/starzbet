import { type TReducer } from "@sb/utils";
import { isLiveSelectedTournamentIdSelector } from "../Selectors/LiveSelectors";
import { type IWithLiveState } from "../LiveState";
import { type changeLiveSelectedMapAction } from "../LiveActions";

const changeLiveSelectedMapReducer: TReducer<IWithLiveState, typeof changeLiveSelectedMapAction> = (
  state,
  {
    payload: {
      sportId,
      tournamentId,
    },
  },
) => {
  const list = state.live.selectedMap[sportId] || [];

  const selected = isLiveSelectedTournamentIdSelector(sportId, tournamentId)(state);

  return {
    ...state,
    live: {
      ...state.live,
      selectedMap: {
        ...state.live.selectedMap,
        [sportId]: selected
          ? list.filter((it) => it !== tournamentId)
          : [...list, tournamentId],
      },
    },
  };
};

export { changeLiveSelectedMapReducer };
