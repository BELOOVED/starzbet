import type { ActionCreator } from "redux";
import {
  createAsyncValidationExtension,
  createForm,
  form,
  type IDecoratorDefinition,
  type IFormAction,
  submittingExtension,
  VALIDATE_FORM_FIELD_ON_ASYNC_VALIDATION_DECORATORS,
  validationExtension,
} from "@sb/form-new";
import type { TPlatformAppState } from "../../../../PlatformInitialState";
import { PRIVATE_REGISTRATION_FORM_FIELDS } from "../Fields";
import { privateRegistrationSubmitEpic } from "../Epics/RegistrationSubmitEpic";

// TODO Remove cast @Hleb Yakush @Yahor Litavar
const PRIVATE_REGISTRATION_FORM_CONFIG = createForm<TPlatformAppState>({
  extensions: [validationExtension, submittingExtension, createAsyncValidationExtension({ autoRun: true, debounce: 2000 })],
  decorators: [...VALIDATE_FORM_FIELD_ON_ASYNC_VALIDATION_DECORATORS] as unknown as IDecoratorDefinition<
    ActionCreator<IFormAction>,
    TPlatformAppState
  >[],
  form: form({
    fields: PRIVATE_REGISTRATION_FORM_FIELDS,
  }),
  epics: [privateRegistrationSubmitEpic],
});

export { PRIVATE_REGISTRATION_FORM_CONFIG };
