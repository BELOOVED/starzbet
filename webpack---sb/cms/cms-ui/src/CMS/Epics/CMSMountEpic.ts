import { of, switchMap } from "rxjs";
import { isCreator } from "@sb/utils";
import {  mountFormAction } from "@sb/form-new";
import { fileExtensionFactory } from "@sb/file-service-extension";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { getCMSContext, getDefCreatorFn, getEnvCode } from "../../EpicUtils/EpicUtils";
import { type TCmsAppState } from "../../Model/TCmsAppState";
import { changeCurrentFormAction } from "../CMSActions";
import { createCMSRootDecorator } from "../CMSDecorator";
import { getCorrectDefByEnvCode } from "../Utils/GetCorrectDefByEnvCode";

const changeCurrentFormEpic: TCmsAppEpic = (action$, _, deps) => action$.pipe(
  isCreator(changeCurrentFormAction),
  switchMap((action) => {
    const defCreatorFn = getDefCreatorFn(deps);

    const context = getCMSContext(deps);

    const formName = action.payload.formName;

    const environmentCode = getEnvCode(deps);

    const def = defCreatorFn(
      createCMSRootDecorator<TCmsAppState>(context),
      [fileExtensionFactory(formName)],
    );

    const formDef = getCorrectDefByEnvCode<TCmsAppState>(environmentCode, def);

    return of(mountFormAction(
      formName,
      formDef,
      {},
    ));
  }),
);

export { changeCurrentFormEpic };
