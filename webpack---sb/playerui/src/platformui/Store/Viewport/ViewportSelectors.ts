import { createPropertySelector, createSimpleSelector } from "@sb/utils";
import { type TMixAppState } from "../../../sportsbookui/Store/CreateMixInitialState";
import { drawerVisibleSelector } from "../GameInfoDrawer/Selectors/GameInfoDrawerSelectors";
import { IS_SCROLLBAR_GUTTER_SUPPORTED, SCROLLBAR_WIDTH } from "./ViewportUtils";

const viewportSelector = (state: TMixAppState) => state.viewport;

const viewportWidthSelector = createPropertySelector(viewportSelector, "width");
const viewportWidthWithReservedScrollbarSelector = createSimpleSelector(
  [
    viewportWidthSelector,
    drawerVisibleSelector,
  ],
  (width, drawerVisible) => width - (+(drawerVisible && !IS_SCROLLBAR_GUTTER_SUPPORTED) * SCROLLBAR_WIDTH),
);

const innerScrollWidthSelector = createPropertySelector(viewportSelector, "innerScrollWidth");

export { viewportWidthSelector, viewportWidthWithReservedScrollbarSelector, innerScrollWidthSelector };
