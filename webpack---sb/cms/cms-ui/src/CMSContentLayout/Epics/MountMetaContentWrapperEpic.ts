import { filter, map, switchMap } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { getIdByPath } from "@sb/cms-core";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { getCMSContext } from "../../EpicUtils/EpicUtils";
import { metaContentSucceededSelector } from "../Selectors/CMSLayoutSelectors";
import { mountMetaContentEpic } from "./MountMetaContentEpic";

const mountMetaContentWrapperEpic: TCmsAppEpic = (
  action$,
  state$,
  dependencies,
) => {
  const { pathSelector } = getCMSContext(dependencies);

  return state$.pipe(
    map((state) => pathSelector(state)),
    filter((path) => metaContentSucceededSelector(state$.value, getIdByPath(path))),
    distinctUntilChanged(),
    switchMap(() => mountMetaContentEpic(false)(action$, state$, dependencies)),
  );
};

export { mountMetaContentWrapperEpic };
