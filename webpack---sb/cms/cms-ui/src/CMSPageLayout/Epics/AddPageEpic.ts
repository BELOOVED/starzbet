import { EMPTY } from "rxjs";
import { call_CreateCmsPageCommand } from "@sb/sdk/SDKClient/cms";
import { isNil } from "@sb/utils";
import { fromCallWithPostfixFactory } from "@sb/adminui-utils";
import { cmsui_page_error_addPage, cmsui_page_success_addPage } from "@sb/translates/cmsui/Keys";
import { ADD_PAGE_CALL_SYMBOL } from "../../CMS/Model/CMSSymbol";
import { callCommandEpicFactory, getCMSContext, getRpcClient } from "../../EpicUtils/EpicUtils";
import { addPageAction } from "../CMSPageAction";
import { addPageSelector } from "../CMSPageSelectors";
import { loadPagesEpic } from "./LoadPagesRootEpic";

const addPageEpic = callCommandEpicFactory({
  actionCreator: addPageAction,
  callSymbol: ADD_PAGE_CALL_SYMBOL,
  createCall: (action, state, deps) => {
    const payload = addPageSelector(state, action);

    if (isNil(payload)) {
      return EMPTY;
    }

    return fromCallWithPostfixFactory(
      getRpcClient(deps),
    )(call_CreateCmsPageCommand)(payload, getCMSContext(deps).cmsThemeSelector(state), deps, deps.metadata);
  },
  successEpic: loadPagesEpic,
  messageTKeys: {
    success: cmsui_page_success_addPage,
    error: cmsui_page_error_addPage,
  },
});

export { addPageEpic };
