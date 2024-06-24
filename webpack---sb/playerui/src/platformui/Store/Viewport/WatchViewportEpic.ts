import { filter, fromEvent, Observable, switchMap } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { getNotNil } from "@sb/utils";
import { routerEpic } from "@sb/router";
import { type TMixAppEpic } from "../../../common/Store/Root/Epics/TMixAppEpic";
import { getMatch } from "../../../common/Utils/RouterUtils/GetMatch";
import { gainThemeContext } from "../../../common/Utils/ThemeContext";
import { isMobileSelector } from "../../../common/Store/DeviceInfo/DeviceInfoSelectors";
import { INNER_SCROLL_CONTAINER_ID } from "../../Utils/ScrollToTop";
import { gamesMathOptions, ladingMathOptions } from "../PlatformMatchOptions";
import { changeInnerScrollSizeAction, changeViewportSizeAction } from "./ViewportActions";

const factory = (element: HTMLElement, actionCreator: typeof changeViewportSizeAction | typeof changeInnerScrollSizeAction) =>
  new Observable<number>((sub) => {
    const obs = new ResizeObserver(() => sub.next(element.clientWidth)); /*
      not OptimizedResizeObserver because it throttles */

    obs.observe(element);

    return () => obs.disconnect();
  }).pipe(
    distinctUntilChanged(),
    map(actionCreator),
  );

const getInnerScroll = () => getNotNil(
  document.getElementById(INNER_SCROLL_CONTAINER_ID),
  ["watchViewportEpicBase"],
  "inner_scroll_container",
);

const watchViewportEpicBase: TMixAppEpic =
  (_, state$) => {
    const withInnerScroll = gainThemeContext().static.find("withInnerScroll");

    if(isMobileSelector(state$.value) || !withInnerScroll) {
      return factory(document.body, changeViewportSizeAction);
    }

    return document.readyState === "complete"
      ? factory(getInnerScroll(), changeInnerScrollSizeAction)
      : fromEvent(document, "readystatechange").pipe(
        filter(() => document.readyState !== "interactive"),
        switchMap(() => factory(getInnerScroll(), changeInnerScrollSizeAction)),
      );
  };

const watchViewportEpic = routerEpic({
  name: "watchViewport",
  match: (location) => getMatch(ladingMathOptions)(location) || getMatch(gamesMathOptions)(location),
  onStart: () => watchViewportEpicBase,
});

export { watchViewportEpic };
