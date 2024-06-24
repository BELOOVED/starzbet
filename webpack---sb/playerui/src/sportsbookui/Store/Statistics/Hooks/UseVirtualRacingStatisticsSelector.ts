import { createSelector } from "reselect";
import { useParamSelector } from "@sb/utils";
import { virtualRacingStatisticsByShortIdSelector } from "../Selectors/StatisticsSelectors";

const virtualRacingSilksSelector = createSelector(
  virtualRacingStatisticsByShortIdSelector,
  (stats) => {
    if (!stats) {
      return void 0;
    }

    return Math.floor((Number(stats.ID) - 1) / 15) + 1;
  },
);

const useVirtualRacingSilksSelector = (eventId: string, shortId: string) => useParamSelector(
  virtualRacingSilksSelector,
  [eventId, shortId],
);

const virtualRacingStarRatingSelector = createSelector(
  virtualRacingStatisticsByShortIdSelector,
  (stats) => {
    if (!stats) {
      return void 0;
    }

    return Math.floor(Number(stats.StarRating) * 10 / 16) / 10;
  },
);

const useVirtualRacingStarRatingSelector = (eventId: string, shortId: string) => useParamSelector(
  virtualRacingStarRatingSelector,
  [eventId, shortId],
);

const virtualRacingLastFiveSelector = createSelector(
  virtualRacingStatisticsByShortIdSelector,
  (stats) => {
    if (!stats) {
      return void 0;
    }

    return stats.Form.split("");
  },
);

const useVirtualRacingLastFiveSelector = (eventId: string, shortId: string) => useParamSelector(
  virtualRacingLastFiveSelector,
  [eventId, shortId],
);

const virtualRacingLengthBehindWinnerSelector = createSelector(
  virtualRacingStatisticsByShortIdSelector,
  (stats) => {
    if (!stats) {
      return void 0;
    }

    return stats.LBW.split(";");
  },
);

const useVirtualRacingLengthBehindWinnerSelector = (eventId: string, shortId: string) => useParamSelector(
  virtualRacingLengthBehindWinnerSelector,
  [eventId, shortId],
);

export {
  useVirtualRacingSilksSelector,
  useVirtualRacingStarRatingSelector,
  useVirtualRacingLastFiveSelector,
  useVirtualRacingLengthBehindWinnerSelector,
};
