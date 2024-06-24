import { type TReducer } from "@sb/utils";
import { isPreLiveSelectedTournamentIdSelector } from "../Selectors/PreLiveSelectors";
import { type IWithPreLive } from "../PreLiveState";
import { type changePreLiveSelectedMapAction } from "../PreLiveActions";

const changePreLiveSelectedMapReducer: TReducer<IWithPreLive, typeof changePreLiveSelectedMapAction> = (
  state,
  {
    payload: {
      period,
      sportId,
      tournamentId,
    },
  },
) => {
  const map = state.preLive.selectedMap[period] || {};

  const list = map[sportId] || [];

  const selected = isPreLiveSelectedTournamentIdSelector(period, sportId, tournamentId)(state);

  return {
    ...state,
    preLive: {
      ...state.preLive,
      selectedMap: {
        ...state.preLive.selectedMap,
        [period]: {
          ...map,
          [sportId]: selected
            ? list.filter((it) => it !== tournamentId)
            : [...list, tournamentId],
        },
      },
    },
  };
};

export { changePreLiveSelectedMapReducer };
