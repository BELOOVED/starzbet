// @ts-nocheck

import { memo } from "react";
import { ScoreWidget } from "../../ScoreWidget/ScoreWidget";
import { WidgetContainer } from "../WidgetContainer/WidgetContainer";

const VolleyballWidget = memo(
  ({ eventId }) => (
    <WidgetContainer>
      <ScoreWidget eventId={eventId} />
    </WidgetContainer>
  ),
);
VolleyballWidget.displayName = "VolleyballWidget";

export { VolleyballWidget };
