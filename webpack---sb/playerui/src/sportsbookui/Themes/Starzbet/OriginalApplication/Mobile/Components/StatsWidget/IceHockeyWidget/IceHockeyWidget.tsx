// @ts-nocheck

import { memo } from "react";
import { ScoreWidget } from "../../ScoreWidget/ScoreWidget";
import { WidgetContainer } from "../WidgetContainer/WidgetContainer";

const IceHockeyWidget = memo(({ eventId }) => (
  <WidgetContainer>
    <ScoreWidget eventId={eventId} />
  </WidgetContainer>
));
IceHockeyWidget.displayName = "IceHockeyWidget";

export { IceHockeyWidget };
