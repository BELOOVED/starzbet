import type { ActionCreator } from "redux";
import {
  _HIDDEN_FIELD_,
  type IDecoratorDefinition,
  type IFormAction,
  type IWithFormsState,
  onAction,
  selectFieldValue,
  setFormFieldValue,
} from "@sb/form-new";
import { getNotNil, isArray } from "@sb/utils";
import { ETypeInput, getMultiLangInputWithNewValue, type IMediaInputValue, PAGE_ID } from "@sb/cms-core";
import { addMediaInputValueAction } from "./CmsMediaInputUrlAction";

const cmsMediaInputUrlDecorator = <State extends IWithFormsState>(): IDecoratorDefinition<ActionCreator<IFormAction>, State>[] => [
  onAction<typeof addMediaInputValueAction, State>(
    addMediaInputValueAction,
    (state, action, next) => {
      const {
        payload: {
          fieldPath,
          systemLocale,
          value,
          pageId,
        },
        metadata: { formName },
      } = action;

      const currentValue =
        getNotNil(selectFieldValue<IMediaInputValue>(state, formName, fieldPath), ["CMSMediaInputUrlDecorator"], "currentValue");

      const hiddenField = getNotNil(currentValue[_HIDDEN_FIELD_], ["CMSMediaInputUrlDecorator"], "hiddenField");

      if (hiddenField !== ETypeInput.eternal) {
        throw new Error(`CMSMediaInputUrlDecorator work only with "${ETypeInput.eternal}" type`);
      }

      if (isArray(currentValue.anchor)) {
        const nextAnchor = getMultiLangInputWithNewValue(currentValue.anchor, value || "", systemLocale);

        return setFormFieldValue(
          next(state, action),
          formName,
          fieldPath,
          {
            anchor: nextAnchor,
            [PAGE_ID]: pageId,
            [_HIDDEN_FIELD_]: hiddenField,
          },
        );
      } else {
        return setFormFieldValue(
          next(state, action),
          formName,
          fieldPath,
          {
            [PAGE_ID]: pageId,
            anchor: [{ locale: systemLocale, translate: value }],
            [_HIDDEN_FIELD_]: hiddenField,
          },
        );
      }
    },
  ),
];

export { cmsMediaInputUrlDecorator };
