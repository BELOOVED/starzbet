import { type FormEvent, useCallback } from "react";
import { useAction, useActionWithBind } from "@sb/utils";
import { resetFormAction, submitFormAction } from "../Store";
import { useFormName } from "./Hooks";

type TFormHandlerPredicate = () => boolean

const defaultPredicate: TFormHandlerPredicate = () => true;

const useSubmitHandler = (predicate: TFormHandlerPredicate = defaultPredicate) => {
  const formName = useFormName();
  const submitForm = useAction(submitFormAction);

  return useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (predicate()) {
        // if not wrapped in html form -> value === undefined
        submitForm(formName, (e.nativeEvent as { submitter?: { value?: string; }; }).submitter?.value);
      }
    },
    [formName, predicate],
  );
};

const useResetHandler = (predicate: TFormHandlerPredicate = defaultPredicate) => {
  const formName = useFormName();
  const resetForm = useActionWithBind(resetFormAction, formName);

  return useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (predicate()) {
        resetForm();
      }
    },
    [resetForm, predicate],
  );
};

export { useSubmitHandler, useResetHandler };

export type { TFormHandlerPredicate };
