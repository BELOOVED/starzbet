import { lazy, memo, Suspense } from "react";
import { extractDefaultExport } from "@sb/utils";
import { useSelector } from "../../Hooks/ReactRedux";
import { selectTranslateMode } from "../../Store/Selectors";

const LazyPanel = lazy(() => import("../TranslatorPanel/TranslatorPanel").then(extractDefaultExport("TranslatorPanel")));

const PanelWrapper = memo(() => {
  const translateMode = useSelector(selectTranslateMode);

  return (
    translateMode
      ? (
        <Suspense fallback={"loading...."}>
          <LazyPanel />
        </Suspense>
      )
      : null
  );
});
PanelWrapper.displayName = "PanelWrapper";

export { PanelWrapper };
