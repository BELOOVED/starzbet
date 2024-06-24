import { type ActionCreator } from "redux";
import { deepEqual } from "fast-equals";
import {
  dropFormFieldAction,
  isEqualPath,
  type ISetFieldValueAction,
  type IWithFormsState,
  onAction,
  selectFieldValue,
  setFieldValueAction,
  setFormFieldValue,
  type THandler,
} from "@sb/form-new";
import { STATE_WAS_CHANGED } from "@sb/cms-core";
import { addMediaInputValueAction } from "../CMSContentLayout/Components/CMSMediaType/CMSMediaInputUrl/CmsMediaInputUrlAction";
import { addBlockAction, addOneOfBlockAction } from "../CMSContentLayout/Components/CMSListContainer/CMSListAction";
import { resetSubFormAction } from "../CMSContentLayout/CMSLayoutActions";
import type { IRootDecorator } from "../Model/Types";
import { getMetaPageContentPath, getPathToContent, getStateWasChangedPath } from "./Utils/Helpers";
import { isRichTextComponentSelector } from "./Selectors/CMSFormSelectors";

const stateWasChangedHandler = <State extends IWithFormsState>
  ({ activeTabSelector, pathSelector }: IRootDecorator, stateWasChanged?: boolean): THandler<ActionCreator<ISetFieldValueAction>, State> =>
    (state, action, next) => {
      const { metadata: { formName }, payload: { fieldPath, value } } = action;
      const activeTab = activeTabSelector(state);
      const path = pathSelector(state);
      const stateWasChangedValue = selectFieldValue(state, formName, getStateWasChangedPath(activeTab, path));

      if ((fieldPath.at(-1) === STATE_WAS_CHANGED || stateWasChangedValue) && !stateWasChanged) {
        return next(state, action);
      }
      const pathToRootContent = getPathToContent(path, activeTab);
      const content = selectFieldValue(state, formName, fieldPath);
      const pathToMetaContent = getMetaPageContentPath(path);
      // we cannot setFieldValue in component for rootContentPath or metaContentPath,
      // only if we setFieldValue in epic for mount or reset subForm
      // in these cases, we don't need set stateWasChanged value
      if (isEqualPath(fieldPath, pathToRootContent) || isEqualPath(fieldPath, pathToMetaContent)) {
        return next(state, action);
      }
      const isRichTextComponent = isRichTextComponentSelector(state, formName, fieldPath);
      // rich-text set value in useEffect, and we need use deepEqual for it, and check that value are equal previous value
      if (isRichTextComponent && deepEqual(content, value)) {
        return next(state, action);
      }

      const stateWasChangedPath = getStateWasChangedPath(activeTab, path);

      return setFormFieldValue(
        next(state, action),
        formName,
        stateWasChangedPath,
        !stateWasChanged,
      );
    };

const cmsStateWasChangedDecorator = <State extends IWithFormsState>(context: IRootDecorator) => [
  onAction(setFieldValueAction, stateWasChangedHandler<State>(context)),
  onAction(addMediaInputValueAction, stateWasChangedHandler<State>(context)),
  onAction(addOneOfBlockAction, stateWasChangedHandler<State>(context)),
  onAction(addBlockAction, stateWasChangedHandler<State>(context)),
  onAction(dropFormFieldAction, stateWasChangedHandler<State>(context)),
  onAction(resetSubFormAction, stateWasChangedHandler<State>(context, true)),
];

export { cmsStateWasChangedDecorator };
