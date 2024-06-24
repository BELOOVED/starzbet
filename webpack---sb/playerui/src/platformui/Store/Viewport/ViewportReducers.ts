import { createRootReducer } from "@sb/utils";
import { type TMixAppState } from "../../../sportsbookui/Store/CreateMixInitialState";
import { changeInnerScrollSizeAction, changeViewportSizeAction } from "./ViewportActions";

const changeViewportSizeReducer = (
  state: TMixAppState,
  { payload }: ReturnType<typeof changeViewportSizeAction>,
): TMixAppState => ({
  ...state,
  viewport: {
    ...state.viewport,
    width: payload.width,
  },
});

const changeInnerScrollSizeReducer = (
  state: TMixAppState,
  { payload }: ReturnType<typeof changeInnerScrollSizeAction>,
): TMixAppState => ({
  ...state,
  viewport: {
    ...state.viewport,
    innerScrollWidth: payload.width,
  },
});

const viewportRootReducer = createRootReducer([
  [changeViewportSizeReducer, changeViewportSizeAction],
  [changeInnerScrollSizeReducer, changeInnerScrollSizeAction],
]);

export { viewportRootReducer };
