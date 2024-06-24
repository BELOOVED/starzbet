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
import { type TPlatformAppState } from "../../../../PlatformInitialState";
import { REGISTRATION_FORM_FIELDS } from "../Fields";
import { registrationSubmitEpic } from "../Epics/RegistrationSubmitEpic";

// TODO Remove cast @Hleb Yakush @Yahor Litavar
const REGISTRATION_FORM_CONFIG = createForm<TPlatformAppState>({
  extensions: [validationExtension, submittingExtension, createAsyncValidationExtension({ autoRun: true, debounce: 2000 })],
  decorators: [...VALIDATE_FORM_FIELD_ON_ASYNC_VALIDATION_DECORATORS] as unknown as IDecoratorDefinition<
    ActionCreator<IFormAction>,
    TPlatformAppState
  >[],
  form: form({
    fields: REGISTRATION_FORM_FIELDS,
  }),
  epics: [registrationSubmitEpic],
});

export { REGISTRATION_FORM_CONFIG };
