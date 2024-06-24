import { EMPTY } from "rxjs";
import { call_UpdateCmsPageCommand } from "@sb/sdk/SDKClient/cms";
import { isNil } from "@sb/utils";
import { fromCallWithPostfixFactory } from "@sb/adminui-utils";
import { cmsui_page_error_changePage, cmsui_page_success_changePage } from "@sb/translates/cmsui/Keys";
import { CHANGE_PAGE_CALL_SYMBOL } from "../../CMS/Model/CMSSymbol";
import { callCommandEpicFactory, getCMSContext, getRpcClient } from "../../EpicUtils/EpicUtils";
import { changePageNameAction } from "../CMSPageAction";
import { changePageSelector } from "../CMSPageSelectors";
import { loadPagesEpic } from "./LoadPagesRootEpic";

const changePageEpic = callCommandEpicFactory({
  actionCreator: changePageNameAction,
  callSymbol: CHANGE_PAGE_CALL_SYMBOL,
  createCall: (action, state, deps) => {
    const payload = changePageSelector(state, action);

    if (isNil(payload)) {
      return EMPTY;
    }

    return fromCallWithPostfixFactory(getRpcClient(deps))(
      call_UpdateCmsPageCommand,
    )(payload, getCMSContext(deps).cmsThemeSelector(state), deps, deps.metadata);
  },
  successEpic: loadPagesEpic,
  messageTKeys: {
    success: cmsui_page_success_changePage,
    error: cmsui_page_error_changePage,
  },
});

export { changePageEpic };
