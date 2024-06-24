import { type TNullable, type TVoidFn, useAction, useParamSelector, usePersistCallback } from "@sb/utils";
import { selectFieldValue, setFieldValueAction } from "@sb/form-new";
import { TICKET_SEND_FORM_NAME, TICKET_SEND_FORM_PATH } from "../Model";

const useParentMessage = (): [TNullable<string>, TVoidFn] => {
  const message = useParamSelector(selectFieldValue<string>, [TICKET_SEND_FORM_NAME, TICKET_SEND_FORM_PATH.parentMessage]);
  const setMessage = useAction(setFieldValueAction);

  const handler = usePersistCallback((value: string | null) => {
    setMessage(TICKET_SEND_FORM_NAME, TICKET_SEND_FORM_PATH.parentMessage, value);
  });

  return [message, handler];
};

export { useParentMessage };
