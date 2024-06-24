import { EMPTY, switchMap } from "rxjs";
import { isCreator } from "@sb/utils";
import { EBlockTypeMap } from "@sb/cms-core";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { getCMSContext } from "../../EpicUtils/EpicUtils";
import { resetSubFormAction } from "../CMSLayoutActions";
import { mountBlockContentEpic } from "./MountBlockContentEpic";
import { mountPageContentEpic } from "./MountPageContentEpic";

const resetEpic: TCmsAppEpic = (action$, state$, dependencies) => {
  const { activeTabSelector } = getCMSContext(dependencies);

  const activeTab = activeTabSelector(state$.value);

  if (activeTab === EBlockTypeMap.PAGES) {
    return mountPageContentEpic(true)(action$, state$, dependencies);
  }

  if (activeTab === EBlockTypeMap.BLOCKS) {
    return mountBlockContentEpic(true)(action$, state$, dependencies);
  }

  return EMPTY;
};

const resetBlockContentEpic: TCmsAppEpic = (action$, state$, dependencies) => action$.pipe(
  isCreator(resetSubFormAction),
  switchMap(() => resetEpic(action$, state$, dependencies)),
);

export { resetBlockContentEpic };
