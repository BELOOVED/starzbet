import { map, switchMap } from "rxjs";
import { distinctUntilChanged, filter } from "rxjs/operators";
import { deepEqual } from "fast-equals";
import { getIdByPath } from "@sb/cms-core";
import { PAGES_CALL_SYMBOL } from "../../CMS/Model/CMSSymbol";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { getCMSContext, whenDataLoadedEpic } from "../../EpicUtils/EpicUtils";
import { blockSucceededSelector } from "../Selectors/CMSLayoutSelectors";
import { loadBlockContentExtendsPathEpic } from "./LoadBlockContentExtendsPathEpic";

const loadBlockContentRootEpic: TCmsAppEpic = (action$, state$, dependencies) => {
  const { pathSelector } = getCMSContext(dependencies);

  return state$.pipe(
    map((value) => pathSelector(value)),
    distinctUntilChanged(deepEqual),
    filter((path) => !blockSucceededSelector(state$.value, getIdByPath(path))),
    switchMap((path) =>
      whenDataLoadedEpic(PAGES_CALL_SYMBOL)(loadBlockContentExtendsPathEpic(path))(action$, state$, dependencies)),
  );
};

export { loadBlockContentRootEpic };
