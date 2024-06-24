import { EMPTY, of } from "rxjs";
import { setFieldValueAction, type TFieldPath } from "@sb/form-new";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";

const emptyPageContentEpic = (
  isNullPageContent: boolean,
  formName: string,
  path: TFieldPath,
): TCmsAppEpic => () => !isNullPageContent
  ? of(
    setFieldValueAction(
      formName,
      path,
      null,
    ),
  )
  : EMPTY;

export { emptyPageContentEpic };
