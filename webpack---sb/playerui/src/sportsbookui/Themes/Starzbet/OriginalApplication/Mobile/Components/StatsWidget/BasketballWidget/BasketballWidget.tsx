// @ts-nocheck
import { memo } from "react";
import { ScoreWidget } from "../../ScoreWidget/ScoreWidget";
import { WidgetContainer } from "../WidgetContainer/WidgetContainer";

const BasketballWidget = memo(({ eventId }) => (
  <WidgetContainer>
    <ScoreWidget eventId={eventId} />
  </WidgetContainer>
));
BasketballWidget.displayName = "BasketballWidget";

export { BasketballWidget };
