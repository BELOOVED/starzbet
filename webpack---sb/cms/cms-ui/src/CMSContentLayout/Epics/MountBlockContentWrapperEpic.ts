import { EMPTY } from "rxjs";
import { EBlockTypeMap } from "@sb/cms-core";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { getCMSContext } from "../../EpicUtils/EpicUtils";
import { mountBlockContentEpic } from "./MountBlockContentEpic";
import { mountPageContentEpic } from "./MountPageContentEpic";

const mountBlockContentWrapperEpic:TCmsAppEpic = (action$, state$, dependencies) => {
  const { activeTabSelector } = getCMSContext(dependencies);

  const activeTab = activeTabSelector(state$.value);

  if (activeTab === EBlockTypeMap.PAGES) {
    return mountPageContentEpic(false)(action$, state$, dependencies);
  }

  if (activeTab === EBlockTypeMap.BLOCKS) {
    return mountBlockContentEpic(false)(action$, state$, dependencies);
  }

  return EMPTY;
};

export { mountBlockContentWrapperEpic };
