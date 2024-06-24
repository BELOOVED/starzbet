import { call_ChangeCmsPagePriorityCommand } from "@sb/sdk/SDKClient/cms";
import { fromCallWithPostfixFactory } from "@sb/adminui-utils";
import { cmsui_page_error_changePagesPriority, cmsui_page_success_changePagesPriority } from "@sb/translates/cmsui/Keys";
import { CHANGE_PAGE_PRIORITY_CALL_SYMBOL } from "../../CMS/Model/CMSSymbol";
import { callCommandEpicFactory, getCMSContext, getRpcClient } from "../../EpicUtils/EpicUtils";
import { changePagePriorityAction } from "../CMSPageAction";
import { changePagePrioritySelector } from "../CMSPageSelectors";
import { loadPagesEpic } from "./LoadPagesRootEpic";

const changePagePriorityEpic = callCommandEpicFactory({
  actionCreator: changePagePriorityAction,
  callSymbol: CHANGE_PAGE_PRIORITY_CALL_SYMBOL,
  createCall: (action, state, deps) => {
    const payload = changePagePrioritySelector(state, action);

    return fromCallWithPostfixFactory(
      getRpcClient(deps),
    )(call_ChangeCmsPagePriorityCommand)(payload, getCMSContext(deps).cmsThemeSelector(state), deps, deps.metadata);
  },
  successEpic: loadPagesEpic,
  messageTKeys: {
    success: cmsui_page_success_changePagesPriority,
    error: cmsui_page_error_changePagesPriority,
  },
});

export { changePagePriorityEpic };
