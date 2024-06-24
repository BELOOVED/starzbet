import { EMPTY, merge, of, switchMap } from "rxjs";
import { call_UpdateCmsPageMetaContentCommand } from "@sb/sdk/SDKClient/cms";
import { isCreator } from "@sb/utils";
import { isFormDef, selectFieldDef, selectIsFieldSyncValid } from "@sb/form-new";
import { META_CONTENT, PAGE_CONTENT } from "@sb/cms-core";
import { appServiceShowErrorMessageAction, fromCallWithPostfixFactory } from "@sb/adminui-utils";
import {
  cmsui_form_validation_invalidBlockContentSubForm,
  cmsui_form_validation_invalidMetaContentSubForm,
  cmsui_page_error_changeMetaContent,
  cmsui_page_success_metaContent,
} from "@sb/translates/cmsui/Keys";
import { PUSH_META_CONTENT_CALL_SYMBOL } from "../../CMS/Model/CMSSymbol";
import { callCommandEpicFactory, getCMSContext, getRpcClient } from "../../EpicUtils/EpicUtils";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { getMetaPageContentPath, getPageContentPath } from "../../CMS/Utils/Helpers";
import { dispatchCmsUpdateEvent } from "../../WindowEvenCreator";
import { pageNameOrDefaultPageNameSelector } from "../../CMSPageLayout/CMSPageSelectors";
import { pushMetaContentSelector } from "../Selectors/CMSLayoutSelectors";
import { pushBlockAction, pushMetaContentAction, validationPageAndMetaContentsAction } from "../CMSLayoutActions";

const validationPageAndMetaContentsEpic: TCmsAppEpic = (action$, state$, deps) => action$.pipe(
  isCreator(validationPageAndMetaContentsAction),
  switchMap((action) => {
    const { payload: { fieldPath }, metadata: { formName } } = action;

    const isPageContentValidation = selectIsFieldSyncValid(state$.value, formName, [...fieldPath, PAGE_CONTENT]);

    const { activeTabSelector, appServiceLocaleSelector } = getCMSContext(deps);

    const activeTab = activeTabSelector(state$.value);

    const pageName = pageNameOrDefaultPageNameSelector(state$.value, formName, fieldPath, appServiceLocaleSelector);

    if (!isPageContentValidation) {
      return of(appServiceShowErrorMessageAction(cmsui_form_validation_invalidBlockContentSubForm, { error: pageName }));
    }

    const def = selectFieldDef(state$.value, formName, getPageContentPath(fieldPath));

    if (isFormDef(def) && META_CONTENT in def.fields) {
      const isMetaContentValidation = selectIsFieldSyncValid(
        state$.value,
        formName,
        getMetaPageContentPath(fieldPath),
      );

      if (!isMetaContentValidation) {
        return of(appServiceShowErrorMessageAction(cmsui_form_validation_invalidMetaContentSubForm, { error: pageName }));
      }
    }

    return merge(
      of(pushMetaContentAction(fieldPath, formName)),
      of(pushBlockAction(formName, fieldPath, activeTab)),
    );
  }),
);

const pushMetaContentEpic = callCommandEpicFactory({
  actionCreator: pushMetaContentAction,
  callSymbol: PUSH_META_CONTENT_CALL_SYMBOL,
  createCall: (action, state, deps) => {
    const payload = pushMetaContentSelector(state, action);

    return fromCallWithPostfixFactory(
      getRpcClient(deps),
    )(call_UpdateCmsPageMetaContentCommand)(payload, getCMSContext(deps).cmsThemeSelector(state), deps, deps.metadata);
  },
  successEpic: () => {
    dispatchCmsUpdateEvent({ metaContent: true });

    return EMPTY;
  },
  messageTKeys: {
    success: cmsui_page_success_metaContent,
    error: cmsui_page_error_changeMetaContent,
  },
});

export { pushMetaContentEpic, validationPageAndMetaContentsEpic };
