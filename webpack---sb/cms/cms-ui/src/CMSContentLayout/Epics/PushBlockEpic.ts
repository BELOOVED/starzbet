import { merge, of, switchMap } from "rxjs";
import { call_UpdateCmsBlockCommand } from "@sb/sdk/SDKClient/cms";
import { isCreator } from "@sb/utils";
import { selectIsFieldSyncValid, setFieldValueAction } from "@sb/form-new";
import { appServiceShowErrorMessageAction, fromCallWithPostfixFactory } from "@sb/adminui-utils";
import {
  cmsui_block_error_pushBlock,
  cmsui_block_success_pushBlock,
  cmsui_form_validation_invalidBlockContentSubForm,
} from "@sb/translates/cmsui/Keys";
import { PUSH_BLOCK_CALL_SYMBOL, PUSH_IMPORTED_BLOCK_CALL_SYMBOL } from "../../CMS/Model/CMSSymbol";
import { callCommandEpicFactory, getCMSContext, getRpcClient } from "../../EpicUtils/EpicUtils";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { dispatchCmsUpdateEvent } from "../../WindowEvenCreator";
import { getStateWasChangedPath } from "../../CMS/Utils/Helpers";
import { pushBlockAction, pushImportedBlockAction, validationBlockAction } from "../CMSLayoutActions";
import { pushBlockSelector, pushImportedBlockSelector } from "../Selectors/CMSLayoutSelectors";
import { loadBlockContentExtendsPathEpic } from "./LoadBlockContentExtendsPathEpic";

const validBlockEpic: TCmsAppEpic = (action$, state$, deps) => action$.pipe(
  isCreator(validationBlockAction),
  switchMap((action) => {
    const { payload: { fieldPath }, metadata: { formName } } = action;

    const isSubFormValid = selectIsFieldSyncValid(state$.value, formName, fieldPath);

    const { pathSelector, activeTabSelector } = getCMSContext(deps);

    const contextPath = pathSelector(state$.value);

    const activeTab = activeTabSelector(state$.value);

    if (!isSubFormValid) {
      return of(appServiceShowErrorMessageAction(cmsui_form_validation_invalidBlockContentSubForm, { error: contextPath[1] }));
    }

    return of(pushBlockAction(formName, fieldPath, activeTab));
  }),
);

const pushBlockEpic = callCommandEpicFactory({
  actionCreator: pushBlockAction,
  callSymbol: PUSH_BLOCK_CALL_SYMBOL,
  createCall: (action, state, deps) => {
    const payload = pushBlockSelector(state, action);

    return fromCallWithPostfixFactory(
      getRpcClient(deps),
    )(call_UpdateCmsBlockCommand)(payload, getCMSContext(deps).cmsThemeSelector(state), deps, deps.metadata);
  },
  successEpicFactory: (action) => (action$, state$, dependencies) => {
    const payload = pushBlockSelector(state$.value, action);
    const { payload: { fieldPath }, metadata: { formName } } = action;
    dispatchCmsUpdateEvent({ pageId: payload.pageId, blockType: payload.blockType });
    const { activeTabSelector } = getCMSContext(dependencies);
    const activeTab = activeTabSelector(state$.value);
    const stateWasChangedPath = getStateWasChangedPath(activeTab, fieldPath);

    return merge(
      loadBlockContentExtendsPathEpic(fieldPath)(action$, state$, dependencies),
      of(setFieldValueAction(formName, stateWasChangedPath, false)),
    );
  },
  messageTKeys: {
    success: cmsui_block_success_pushBlock,
    error: cmsui_block_error_pushBlock,
  },
});

const pushImportedBlockEpic = callCommandEpicFactory({
  actionCreator: pushImportedBlockAction,
  callSymbol: PUSH_IMPORTED_BLOCK_CALL_SYMBOL,
  createCall: (action, state, deps) => {
    const payload = pushImportedBlockSelector(state, action);

    return fromCallWithPostfixFactory(
      getRpcClient(deps),
    )(call_UpdateCmsBlockCommand)(payload, getCMSContext(deps).cmsThemeSelector(state), deps, deps.metadata);
  },
  successEpicFactory: (action) => (action$, state$, dependencies) => {
    const { activeTabSelector } = getCMSContext(dependencies);
    const activeTab = activeTabSelector(state$.value);
    const payload = pushImportedBlockSelector(state$.value, action);

    dispatchCmsUpdateEvent({ pageId: payload.pageId, blockType: payload.blockType });
    const stateWasChangedPath = getStateWasChangedPath(activeTab, action.payload.fieldPath);

    return merge(
      loadBlockContentExtendsPathEpic(action.payload.fieldPath)(action$, state$, dependencies),
      of(setFieldValueAction(action.metadata.formName, stateWasChangedPath, false)),
    );
  },
  messageTKeys: {
    success: cmsui_block_success_pushBlock,
    error: cmsui_block_error_pushBlock,
  },
});

export { pushBlockEpic, validBlockEpic, pushImportedBlockEpic };
