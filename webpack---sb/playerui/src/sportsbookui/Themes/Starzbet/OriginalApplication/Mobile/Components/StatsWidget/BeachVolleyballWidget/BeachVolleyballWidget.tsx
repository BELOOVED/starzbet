// @ts-nocheck

import { memo } from "react";
import { ScoreWidget } from "../../ScoreWidget/ScoreWidget";
import { WidgetContainer } from "../WidgetContainer/WidgetContainer";

const BeachVolleyballWidget = memo(({ eventId }) => (
  <WidgetContainer>
    <ScoreWidget eventId={eventId} />
  </WidgetContainer>
));
BeachVolleyballWidget.displayName = "BeachVolleyballWidget";

export { BeachVolleyballWidget };
