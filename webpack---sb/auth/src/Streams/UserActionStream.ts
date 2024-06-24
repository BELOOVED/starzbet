import { fromEvent, interval, merge, throttle } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { IS_SERVER } from "@sb/utils";
import type { IClock } from "@sb/utils/TimeUtils/IClock";

/**
 * Events for user activity detection.
 */
const allControlEvents = [
  "mousedown",
  "mouseup",
  "keydown",
  "keyup",
  "mousemove",
  "wheel",
  "touchstart",
  "touchend",
];

// handle case when we use node env.
const listeners = IS_SERVER
  ? []
  : allControlEvents.map((event) => fromEvent(window, event))
;

/**
 * This stream subscribes to each event from `allControlEvents` list.
 * When one of these event will be triggered - stream emit the event timestamp.
 */
const userActionsStream$ = (clock: IClock) => merge(...listeners)
  .pipe(
    startWith(clock.now()),
    throttle(() => interval(2000)),
    map(() => clock.now()),
  );

export { userActionsStream$ };
