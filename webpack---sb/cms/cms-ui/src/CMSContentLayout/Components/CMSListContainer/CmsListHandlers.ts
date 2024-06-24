import type { ActionCreator } from "redux";
import {
  addHiddenFieldToValue,
  CMS_EXTENSION_KEY,
  createEmptyValue,
  type ISetFieldValueAction,
  type IWithFormsState,
  KindService,
  ReducerError,
  selectFieldDefExtension,
  selectFieldValue,
  setFormFieldValue,
  type TFieldPath,
  type THandler,
} from "@sb/form-new";
import {
  BLOCK_CONTENT,
  getParentPath,
  type ICMSExtensions,
  type IData,
  PAGE_CONTENT,
  PRIORITY,
  SHOW_CHILDREN_BY_DEFAULT,
  TAGS_PATH_LIST,
} from "@sb/cms-core";
import { isNil, isNotNil, isNumber, isObject, isString } from "@sb/utils";
import type { IRootDecorator } from "../../../Model/Types";
import { newTagsListSelector } from "../../Selectors/DecoratorSelectors";

const getPriority = (listVal: IData[]) => {
  const lastOrder = listVal.at(-1)?.[PRIORITY];

  return isNumber(lastOrder) ? lastOrder + 1 : 0;
};
// "Tag.content.2" => 2
const getTagNumber = (tag: string) => Number(tag.split(".").at(-1));

interface IWithChooseTags {
  chooseTags: string[];
}

const getPromosWithoutTag = (promoContent: IWithChooseTags[], tag: string) => promoContent.map((promo) => {
  if (!("chooseTags" in promo)) {
    return promo;
  }

  const tagNumber = getTagNumber(tag);

  const newChooseTags = promo.chooseTags
    .filter((it) => it !== tag)
    .map((tag) => {
      const promoTagNumber = getTagNumber(tag);

      if (isNaN(tagNumber) || isNaN(promoTagNumber)) {
        return tag;
      }

      if (promoTagNumber < tagNumber) {
        return tag;
      }

      const stringTagToArray: TFieldPath = tag.split(".");

      stringTagToArray.splice(-1, 1, promoTagNumber -1);

      return stringTagToArray.join(".");
    });

  return ({
    ...promo,
    chooseTags: newChooseTags,
  });
});

const getPromoParentPath = (fieldPath: TFieldPath, changer: "promoList" | "promos") => {
  const newArray = [...fieldPath];

  newArray.splice(-3, 1, changer);

  return getParentPath(newArray);
};

const newTagsListHandler = <State extends IWithFormsState>
  (pathSelector : IRootDecorator["pathSelector"], isIncrement: boolean): THandler<ActionCreator<ISetFieldValueAction<string>>, State> =>
    (state, action, next) => {
      let nextState = next(state, action);

      const { payload: { fieldPath }, metadata: { formName } } = action;

      const newTagsList = newTagsListSelector(state, formName, fieldPath, isIncrement);

      if(isNil(newTagsList)) {
        return nextState;
      }

      const path = pathSelector(state);

      const pathToTagList = path.concat(PAGE_CONTENT, BLOCK_CONTENT, TAGS_PATH_LIST);

      nextState = setFormFieldValue(
        nextState,
        formName,
        pathToTagList,
        newTagsList,
      );

      if (isIncrement) {
        return nextState;
      }
      const promoListPath = getPromoParentPath(fieldPath, "promoList");

      const promoListContent = selectFieldValue<IWithChooseTags[]>(state, formName, promoListPath);

      const tag = fieldPath.join(".");
      if (isNotNil(promoListContent)) {
        nextState = setFormFieldValue(
          nextState,
          formName,
          promoListPath,
          getPromosWithoutTag(promoListContent, tag),
        );
      }

      const promosPath = getPromoParentPath(fieldPath, "promos");

      const promosContent = selectFieldValue<IWithChooseTags[]>(state, formName, promosPath);

      if (isNotNil(promosContent)) {
        nextState = setFormFieldValue(
          nextState,
          formName,
          promosPath,
          getPromosWithoutTag(promosContent, tag),
        );
      }

      return nextState;
    };

const addListElementHandler = <State extends IWithFormsState>
  (): THandler<ActionCreator<ISetFieldValueAction<string>>, State> =>
    (state, action, next) => {
      const { payload: { fieldPath, value }, metadata: { formName } } = action;
      const listVal = selectFieldValue<IData[]>(state, formName, KindService.getPathWithoutKinds(fieldPath)) ?? [];
      const maxCount = selectFieldDefExtension<ICMSExtensions>(state, formName, fieldPath, CMS_EXTENSION_KEY)?.customExtensions.maxCount;
      const listCount = listVal.length;

      if ((isNotNil(maxCount) && listCount >= maxCount)) {
        return next(state, action);
      }

      const nextIndex = listCount.toString();

      const fieldPathWithIndex = fieldPath.concat(nextIndex);

      const path = isString(value) ? KindService.addKindToLast(fieldPathWithIndex, value) : fieldPathWithIndex;

      const initialValue = createEmptyValue(path)(formName)(state);

      if (!isObject(initialValue)) {
        throw ReducerError.typeError(fieldPath, "Cannot have value except object");
      }

      const priority = getPriority(listVal);

      const newListElement = isNil(value)
        ? { ...initialValue, [PRIORITY]: priority, [SHOW_CHILDREN_BY_DEFAULT]: true }
        : { ...addHiddenFieldToValue(initialValue, value), [PRIORITY]: priority, [SHOW_CHILDREN_BY_DEFAULT]: true };

      return setFormFieldValue(
        next(state, action),
        formName,
        fieldPathWithIndex,
        newListElement,
      );
    };

export { newTagsListHandler, addListElementHandler };
