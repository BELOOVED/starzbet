import { getViewportDimensions } from "./ViewportUtils";

type TViewportState = {
  width: number;
  innerScrollWidth: number;
}

type TWithViewportState = {
  viewport: TViewportState;
}

const viewportInitialState: TWithViewportState = {
  viewport: getViewportDimensions(),
};

export { viewportInitialState };
