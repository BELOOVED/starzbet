import { EMPTY, of } from "rxjs";
import { getNotNil, isVoid } from "@sb/utils";
import { BLOCK_CONTENT } from "@sb/cms-core";
import { setFieldValueAction } from "@sb/form-new";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { getFormName, getCMSContext } from "../../EpicUtils/EpicUtils";
import { getOneBlockByBlockTypeSelector, getSubFormStateBlockSelector } from "../Selectors/CMSLayoutSelectors";
import { getInitialState } from "../Utils/CMSGetInitialState";

/*
isReset === false - for initial Mount, resetFormAction
isReset === true - for reset,
 */

const mountBlockContentEpic = (isReset: boolean): TCmsAppEpic =>
  (_, state$, dependencies) => {
    const formName = getFormName(dependencies);
    const { pathSelector } = getCMSContext(dependencies);

    const path = pathSelector(state$.value);

    const block =
      getOneBlockByBlockTypeSelector(
        state$.value,
        getNotNil(
          path[1],
          ["CMS", "getOneBlockByBlockTypeSelector"],
          "block",
        ).toString(),
      );
    if (isVoid(block)) {
      return isReset
        ? of(
          setFieldValueAction(
            formName,
            path,
            null,
          ),
        )
        : EMPTY;
    }

    const pathForValidContent = [...path, BLOCK_CONTENT];

    const initialState = getInitialState(block.content || {});

    const blockContents = getSubFormStateBlockSelector(state$.value, formName, initialState, pathForValidContent, block.id);

    return of(
      setFieldValueAction(
        formName,
        path,
        blockContents,
      ),
    );
  };

export { mountBlockContentEpic };
