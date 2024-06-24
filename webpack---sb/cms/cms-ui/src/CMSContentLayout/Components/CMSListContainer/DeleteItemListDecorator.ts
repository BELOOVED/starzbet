import { dissocPath } from "ramda";
import type { ActionCreator } from "redux";
import {
  dropFormFieldAction,
  every,
  type IDecoratorDefinition,
  type IFormAction,
  type IWithFormsState,
  KindService,
  onAction,
  selectFieldValue,
  setFormFieldValue,
  type TFieldValue,
  whenIs,
} from "@sb/form-new";
import { getNotNil, isArray, isUnknownObject } from "@sb/utils";
import { getParentPath, PRIORITY } from "@sb/cms-core";
import type { IRootDecorator } from "../../../Model/Types";
import { isNumberOfPathAreEqual } from "../../Utils/DecoratorUtils";
import { newTagsListHandler } from "./CmsListHandlers";

const deleteItemListDecorator =
  <State extends IWithFormsState> ({ pathSelector }: IRootDecorator): IDecoratorDefinition<ActionCreator<IFormAction>, State>[] => [
    onAction<typeof dropFormFieldAction, State>(
      dropFormFieldAction,
      (state, action, next) => {
        const { payload: { fieldPath }, metadata: { formName } } = action;

        const parentPath = KindService.getPathWithoutKinds(getParentPath(fieldPath));
        const itemsList = selectFieldValue(state, formName, parentPath);

        if (!isArray(itemsList)) {
          return next(state, action);
        }

        const valueIndex = Number(
          KindService.getWithoutKind(
            getNotNil(fieldPath.at(-1), ["deleteItemListDecorator"], "valueIndex"),
          ),
        );

        if (isNaN(valueIndex)) {
          throw new Error(`deleteItemListDecorator work only with last fieldPath element is number, but it is "${valueIndex}"`);
        }

        const itemsListWithoutDropElement = dissocPath<TFieldValue[]>([valueIndex], itemsList);

        const parentValueWithNewIndex =
        itemsListWithoutDropElement.map((it, index) => isUnknownObject(it)
          ? ({ ...it, [PRIORITY]: index })
          : it);

        return setFormFieldValue(
          next(state, action),
          formName,
          parentPath,
          parentValueWithNewIndex,
        );
      },
    ),
    onAction<typeof dropFormFieldAction, State>(
      dropFormFieldAction,
      whenIs<typeof dropFormFieldAction, State>(
        every(
          isNumberOfPathAreEqual("tags", -3),
        ),
        newTagsListHandler<State>(pathSelector, false),
      ),
    ),
  ];

export { deleteItemListDecorator };
