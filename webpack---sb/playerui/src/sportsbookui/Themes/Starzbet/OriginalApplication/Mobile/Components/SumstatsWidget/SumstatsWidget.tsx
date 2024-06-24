// @ts-nocheck
import { memo } from "react";
import { SumstatsWidgetContainer } from "../../../Components/SumstatsWidgetContainer/SumstatsWidgetContainer";

const SumstatsWidget = memo((props) => (
  <SumstatsWidgetContainer {...props}>
    {
      (visualRef, statisticsRef, timelineRef) => (
        <>
          <div ref={visualRef} />

          <div ref={timelineRef} />

          <div ref={statisticsRef} />
        </>
      )
    }
  </SumstatsWidgetContainer>
));
SumstatsWidget.displayName = "SumstatsWidget";

export { SumstatsWidget };
