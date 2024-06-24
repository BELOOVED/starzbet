import { map } from "rxjs/operators";
import { filter, pipe, take } from "rxjs";
import { type TAppState } from "../../../sportsbookui/Store/InitialState";

const waitUntil = (selector: (state: TAppState) => boolean) => pipe(
  map(selector),
  filter(Boolean),
  take(1),
);

export { waitUntil };
