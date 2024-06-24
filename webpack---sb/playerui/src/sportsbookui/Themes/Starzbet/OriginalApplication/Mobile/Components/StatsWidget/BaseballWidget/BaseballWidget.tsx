// @ts-nocheck
import { memo } from "react";
import { ScoreWidget } from "../../ScoreWidget/ScoreWidget";
import { WidgetContainer } from "../WidgetContainer/WidgetContainer";

const BaseballWidget = memo(({ eventId }) => (
  <WidgetContainer>
    <ScoreWidget eventId={eventId} />
  </WidgetContainer>
));
BaseballWidget.displayName = "BaseballWidget";

export { BaseballWidget };
