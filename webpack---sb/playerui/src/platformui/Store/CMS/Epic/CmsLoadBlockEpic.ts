import { concat, EMPTY, filter, merge, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { type EPlatformBlockMap } from "@sb/cms-core";
import { callManagerFailedAction, callManagerStartAction } from "@sb/call-manager";
import { isNil, isUnknownObject } from "@sb/utils";
import { fromCMSUpdEvent } from "@sb/cms-on-site-editor";
import { Logger } from "../../../../common/Utils/Logger";
import { CMSLoadBlocksContentByBlockType } from "../../../Api/CMSApi";
import type { TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { CMS_BLOCKS_SYMBOL } from "../Model/CmsSymbols";
import { cmsBlocksAction } from "../CMSAction";
import { isCmsBlockServerLoadedSelector } from "../Selectors/ThemeOneSelectors/CMSSelectors";

const CMSLoadBlockEpicFactory = (blockType: Exclude<
  EPlatformBlockMap,
  EPlatformBlockMap.E2ETest
>): TPlatformEpic =>
  (_, state$, { graphQLClient }) => {
    const isServerLoaded = isCmsBlockServerLoadedSelector(state$.value, blockType);

    if (isServerLoaded) {
      return EMPTY;
    }

    return concat(
      of(callManagerStartAction(CMS_BLOCKS_SYMBOL, blockType)),
      CMSLoadBlocksContentByBlockType(blockType, graphQLClient).pipe(
        switchMap((response) => {
          const blockContent = response.find((it) => it.blockType === blockType);

          if (isNil(blockContent) || isNil(blockContent.content)) {
            return EMPTY;
          }
          const { content, images } = blockContent;

          const contentWithUpdatedAt = isUnknownObject(content)
            ? {
              ...content,
              updatedAt: blockContent.updatedAt,
            }
            : content;

          return of(cmsBlocksAction(contentWithUpdatedAt, blockType, images));
        }),
        catchError((error) => {
          Logger.warn.epic(`[loadCMSBlock] for ${blockType} block load error`, error);

          return of(callManagerFailedAction(CMS_BLOCKS_SYMBOL, error, blockType));
        }),
      ),
    );
  };

const cmsLoadBlockEpic = (blockType: Exclude<EPlatformBlockMap, EPlatformBlockMap.E2ETest>): TPlatformEpic => (
  action,
  state,
  dependencies,
) => merge(
  CMSLoadBlockEpicFactory(blockType)(action, state, dependencies),
  fromCMSUpdEvent.pipe(
    filter((value) => value.blockType === blockType),
    switchMap(() => CMSLoadBlockEpicFactory(blockType)(action, state, dependencies)),
  ),
);

export { cmsLoadBlockEpic };
