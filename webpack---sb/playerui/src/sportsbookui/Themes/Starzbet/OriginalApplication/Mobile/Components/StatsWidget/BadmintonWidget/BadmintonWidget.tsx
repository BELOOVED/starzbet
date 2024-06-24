// @ts-nocheck

import { memo } from "react";
import { ScoreWidget } from "../../ScoreWidget/ScoreWidget";
import { WidgetContainer } from "../WidgetContainer/WidgetContainer";

const BadmintonWidget = memo(({ eventId }) => (
  <WidgetContainer>
    <ScoreWidget eventId={eventId} />
  </WidgetContainer>
));
BadmintonWidget.displayName = "BadmintonWidget";

export { BadmintonWidget };
