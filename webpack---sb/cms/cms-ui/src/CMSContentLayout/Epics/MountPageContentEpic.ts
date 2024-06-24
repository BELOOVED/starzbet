import { EMPTY, of } from "rxjs";
import { selectFieldValue, setFieldValueAction } from "@sb/form-new";
import { BLOCK_CONTENT, type IData, META_CONTENT, PAGE_CONTENT, PAGE_ID } from "@sb/cms-core";
import { isNil, isNotNil, isVoid } from "@sb/utils";
import { getCMSContext, getFormName } from "../../EpicUtils/EpicUtils";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { getPageContentPath, isRecordHaveFieldsExcludedCurrent } from "../../CMS/Utils/Helpers";
import { getOneBlockByPageIdSelector, validBlockContentSelector } from "../Selectors/CMSLayoutSelectors";
import { emptyPageContentEpic } from "./EmptyBlockEpic";

const mountPageContentEpic = (isResetContent: boolean): TCmsAppEpic =>
  (action$, state$, dependencies) => {
    const { pathSelector } = getCMSContext(dependencies);

    const contextPath = pathSelector(state$.value);

    const formName = getFormName(dependencies);

    const page = selectFieldValue<IData>(state$.value, formName, contextPath);

    if (isVoid(page)) {
      return EMPTY;
    }

    const statePageContent = page[PAGE_CONTENT]?.[BLOCK_CONTENT];

    const pageContentPath = contextPath.concat(PAGE_CONTENT);
    if (
      isNotNil(statePageContent) &&
      !isResetContent &&
      isRecordHaveFieldsExcludedCurrent(statePageContent, [META_CONTENT])

    ) {
      return of(
        setFieldValueAction(
          formName,
          pageContentPath,
          {
            [BLOCK_CONTENT]: statePageContent,
          },
        ),
      );
    }
    const block = getOneBlockByPageIdSelector(state$.value, page[PAGE_ID]);

    if (isNil(block)) {
      return emptyPageContentEpic(!isResetContent, formName, pageContentPath)(action$, state$, dependencies);
    }
    const pathForValidContent = getPageContentPath(contextPath);
    const validContent = validBlockContentSelector(state$.value, formName, pathForValidContent, block);

    return of(
      setFieldValueAction(
        formName,
        pageContentPath,
        validContent,
      ),
    );
  };

export { mountPageContentEpic };
