import { call_CreateCallRequestCommand } from "@sb/sdk/SDKClient/callrequest";
import { formSubmitEpicFactory } from "../../../Utils/FormSubmitEpicFactory";
import { CREATE_CALL_REQUEST_FORM_NAME } from "../CallRequestVariables";
import { createCallRequestFormCallPayloadSelector } from "../Selectors/CreateCallRequestFormSelectors";
import { callRequestsLoadEpic } from "./CallRequestsLoadEpics";

const createCallRequestFormSubmitEpic = formSubmitEpicFactory({
  formName: CREATE_CALL_REQUEST_FORM_NAME,
  callPair: [call_CreateCallRequestCommand, createCallRequestFormCallPayloadSelector],
  onSuccess: () => callRequestsLoadEpic,
});

export { createCallRequestFormSubmitEpic };
