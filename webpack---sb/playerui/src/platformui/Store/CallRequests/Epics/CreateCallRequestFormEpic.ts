import { mountUnmountFormEpicFactory } from "@sb/form-new";
import { CREATE_CALL_REQUEST_FORM_NAME } from "../CallRequestVariables";
import {
  createCallRequestFormInitialValuesSelector,
  createCallRequestFormReadyToMountSelector,
} from "../Selectors/CreateCallRequestFormSelectors";
import { CREATE_CALL_REQUEST_FORM_CONFIG } from "../Form/CreateCallRequestForm";

const createCallRequestFormEpic = mountUnmountFormEpicFactory(
  createCallRequestFormReadyToMountSelector,
  CREATE_CALL_REQUEST_FORM_NAME,
  CREATE_CALL_REQUEST_FORM_CONFIG,
  createCallRequestFormInitialValuesSelector,
);

export { createCallRequestFormEpic };
