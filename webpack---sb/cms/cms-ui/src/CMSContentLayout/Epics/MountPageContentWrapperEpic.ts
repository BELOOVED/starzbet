import { filter, map, switchMap } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { getIdByPath, isAnyPagePath } from "@sb/cms-core";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { getCMSContext } from "../../EpicUtils/EpicUtils";
import { blockSucceededSelector } from "../Selectors/CMSLayoutSelectors";
import { mountBlockContentWrapperEpic } from "./MountBlockContentWrapperEpic";

const mountPageContentWrapperEpic: TCmsAppEpic = (
  action$,
  state$,
  dependencies,
) => {
  const { pathSelector } = getCMSContext(dependencies);

  return state$.pipe(
    map((state) => pathSelector(state)),
    map((path) => blockSucceededSelector(state$.value, getIdByPath(path)) && isAnyPagePath(path)),
    distinctUntilChanged(),
    filter((flag) => flag),
    switchMap(() => mountBlockContentWrapperEpic(action$, state$, dependencies)),
  );
};

export { mountPageContentWrapperEpic };
