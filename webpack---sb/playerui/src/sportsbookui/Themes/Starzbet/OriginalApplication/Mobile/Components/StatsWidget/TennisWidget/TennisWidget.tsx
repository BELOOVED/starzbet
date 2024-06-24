// @ts-nocheck
import { memo } from "react";
import { TennisScoreWidget } from "../../ScoreWidget/ScoreWidget";
import { WidgetContainer } from "../WidgetContainer/WidgetContainer";

const TennisWidget = memo(({ eventId }) => (
  <WidgetContainer>
    <TennisScoreWidget eventId={eventId} />
  </WidgetContainer>
));
TennisWidget.displayName = "TennisWidget";

export { TennisWidget };
