import { concat, of } from "rxjs";
import { call_DeleteCmsPageCommand } from "@sb/sdk/SDKClient/cms";
import { getNotNil } from "@sb/utils";
import { fromCallWithPostfixFactory } from "@sb/adminui-utils";
import { cmsui_page_error_deletePage, cmsui_page_success_deletePage } from "@sb/translates/cmsui/Keys";
import { DELETE_PAGE_CALL_SYMBOL } from "../../CMS/Model/CMSSymbol";
import { callCommandEpicFactory, getCMSContext, getRpcClient } from "../../EpicUtils/EpicUtils";
import { FIELD_CONST } from "../../Model/StoreConsts";
import { deletePageAction } from "../CMSPageAction";
import { loadPagesEpic } from "./LoadPagesRootEpic";

const deletePageEpic = callCommandEpicFactory({
  actionCreator: deletePageAction,
  callSymbol: DELETE_PAGE_CALL_SYMBOL,
  createCall: ({ payload: { id } }, state, deps) =>
    fromCallWithPostfixFactory(
      getRpcClient(deps),
    )(call_DeleteCmsPageCommand)(
      { pageId: getNotNil(id, ["call_DeleteCmsPageCommand"], "pageId") },
      getCMSContext(deps).cmsThemeSelector(state),
      deps,
      deps.metadata,
    ),
  successEpic: (action$, state$, dependencies) => {
    const { parentPath, pushAction, pathSelector } = getCMSContext(dependencies);

    const contextPath = pathSelector(state$.value);

    const parentPagePath = contextPath.length > 1 ? contextPath.slice(0, -2) : contextPath;

    return concat(
      loadPagesEpic(action$, state$, dependencies),
      of(pushAction(parentPath.concat(FIELD_CONST), parentPagePath)),
    );
  },
  messageTKeys: {
    success: cmsui_page_success_deletePage,
    error: cmsui_page_error_deletePage,
  },
});

export { deletePageEpic };
