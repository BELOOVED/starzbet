import { lazy, memo, Suspense } from "react";
import { extractDefaultExport, withCondition } from "@sb/utils";
import { cmsPanelVisibleSelector } from "../../Store/Selectors";

const LazyPanel = lazy(() => import("../CMSPanel/CMSPanel").then(extractDefaultExport("CMSPanel")));

const PanelWrapper = withCondition(
  cmsPanelVisibleSelector,
  memo(
    () => (
      <Suspense>
        <LazyPanel />
      </Suspense>
    ),
  ),
);
PanelWrapper.displayName = "PanelWrapper";

export { PanelWrapper };
