import { EMPTY, of } from "rxjs";
import { type IData, PAGE_ID } from "@sb/cms-core";
import { selectFieldValue, setFieldValueAction } from "@sb/form-new";
import { getNotNil, isNil } from "@sb/utils";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { getFormName, getCMSContext } from "../../EpicUtils/EpicUtils";
import { getMetaPageContentPath } from "../../CMS/Utils/Helpers";
import {
  getMetaContentAndFileByPageIdSelector,
  getMetaContentImageIdSelector,
  isMetaContentDefExistSelector,
} from "../Selectors/CMSLayoutSelectors";

const mountMetaContentEpic = (isResetContent: boolean):TCmsAppEpic => (_, state$, dependencies) => {
  const formName = getFormName(dependencies);

  const { pathSelector } = getCMSContext(dependencies);

  const path = pathSelector(state$.value);

  const metaContentPath = getMetaPageContentPath(path);

  const isMetaContentDefExist = isMetaContentDefExistSelector(state$.value, formName, path);

  if (!isMetaContentDefExist) {
    return EMPTY;
  }
  const id =
    getNotNil(selectFieldValue<IData>(state$.value, formName, path), ["CMS", "selectFieldValue"], "no page data")[PAGE_ID];

  const imageId = getMetaContentImageIdSelector(state$.value, id) ?? "";

  const stateMetaContent = selectFieldValue(state$.value, formName, metaContentPath);

  const metaContent = isNil(stateMetaContent) || isResetContent
    ? getMetaContentAndFileByPageIdSelector(state$.value, imageId, id)
    : stateMetaContent;

  if (isNil(metaContent)) {
    return  EMPTY;
  }

  return of(
    setFieldValueAction(
      formName,
      metaContentPath,
      metaContent,
    ),
  );
};

export { mountMetaContentEpic };
