import { EMPTY, merge } from "rxjs";
import { type TFieldPath } from "@sb/form-new";
import { isNil } from "@sb/utils";
import { ECms_BlockWhereFieldPaths } from "@sb/graphql-client";
import { type ERootPages, getIdByPath, isBlockPath, isChildPagePath, isRootPagePath, PathPageTypeMap } from "@sb/cms-core";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { childPageIdByPathSelector, getPageIdByPageTypeSelector } from "../Selectors/CMSLayoutSelectors";
import { loadBlockContentEpic } from "./LoadBlockContentEpicFactory";
import { loadMetaContentEpic } from "./LoadMetaContentEpicFactory";

const loadBlockContentExtendsPathEpic = (path: TFieldPath): TCmsAppEpic => (action$, state$, dependencies) => {
  if (isBlockPath(path)) {
    // block content for no page (like footer)
    return loadBlockContentEpic(path, path[1] as string, ECms_BlockWhereFieldPaths.blockType)(action$, state$, dependencies);
  } else if (isRootPagePath(path)) {
    // block content for root page
    const pageType = PathPageTypeMap[getIdByPath(path) as ERootPages];
    const pageId = getPageIdByPageTypeSelector(state$.value, pageType);

    if (isNil(pageId)) {
      return EMPTY;
    }

    return loadPageContentWithMetaContentEpic(path, pageId)(action$, state$, dependencies);
  } else if (isChildPagePath(path)) {
    // block content for child page
    const id = childPageIdByPathSelector(state$.value, path);

    if (isNil(id)) {
      return EMPTY;
    }

    return loadPageContentWithMetaContentEpic(path, id)(action$, state$, dependencies);
  }

  return EMPTY;
};

const loadPageContentWithMetaContentEpic = (path: TFieldPath, pageId: string): TCmsAppEpic =>
  (action$, state$, dependencies) =>
    merge(
      loadBlockContentEpic(path, pageId, ECms_BlockWhereFieldPaths.blockPageId)(action$, state$, dependencies),
      loadMetaContentEpic(path, pageId)(action$, state$, dependencies),
    );

export { loadBlockContentExtendsPathEpic };
