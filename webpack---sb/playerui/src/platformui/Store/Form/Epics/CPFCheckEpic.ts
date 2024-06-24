import { EMPTY, merge, of, switchMap } from "rxjs";
import { catchError, delay } from "rxjs/operators";
import { isCreator } from "@sb/utils";
import { setFieldValueAction } from "@sb/form-new";
import { Logger } from "../../../../common/Utils/Logger";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { BRAZIL_REGISTRATION_FORM_NAME } from "../../Auth/Forms/Registration/Model";
import { BRAZIL_REGISTRATION_FORM_PATH } from "../../Auth/Forms/Registration/Fields";
import { platformCPFClearAction, platformCPFSendAction } from "../FormActions";

const CPFCheckEpic: TPlatformEpic = (action$, state$, dependencies) => action$.pipe(
  isCreator(platformCPFSendAction),
  switchMap(
    ({ payload: { cpf } }) => merge(
      of(platformCPFClearAction()),
      callWithAbort(
        dependencies.platformHttpApi.callPlayerCPFCheck,
        { identityNumber: cpf },
      ).pipe(
        delay(300),
        switchMap(({ name, birthDate }) => merge(
          of(setFieldValueAction(BRAZIL_REGISTRATION_FORM_NAME, BRAZIL_REGISTRATION_FORM_PATH.name, name)),
          of(setFieldValueAction(BRAZIL_REGISTRATION_FORM_NAME, BRAZIL_REGISTRATION_FORM_PATH.dateOfBirth, birthDate)),
        )),
        catchError((e) => {
          Logger.warn.epic("CPFCheckEpic", e);

          return EMPTY;
        }),
      ),
    ),
  ),
);

export { CPFCheckEpic };
