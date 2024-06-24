// @ts-nocheck
import React from "react";
import classes from "./VirtualStarRating.module.css";
import { useVirtualRacingStarRatingSelector } from "../../../../../../../Store/Statistics/Hooks/UseVirtualRacingStatisticsSelector";

interface IVirtualStarRatingProps {
  eventId: string;
  shortId: string;
}

const VirtualStarRating = React.memo<IVirtualStarRatingProps>(({ eventId, shortId }) => {
  const starRating = useVirtualRacingStarRatingSelector(eventId, shortId);

  if (!starRating) {
    return null;
  }

  return (
    <div className={classes.starRating}>
      <div className={classes.star}>
        <div className={classes.starIcon} />
      </div>

      {starRating}
    </div>
  );
});
VirtualStarRating.displayName = "VirtualStarRating";

export { VirtualStarRating };
