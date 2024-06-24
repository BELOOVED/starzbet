import { filter, mergeMap } from "rxjs/operators";
import { concat, EMPTY, of, switchMap } from "rxjs";
import { combineEpics } from "redux-observable";
import { isCreator } from "@sb/utils";
import { isActionOfForm, unmountDecorators, unmountExtensions } from "../Utils/";
import { type TFormEpic } from "../Types";
import { isMountFormAction } from "../Utils/IsFormAction";
import { formMountedAction, mountFormAction, unmountFormAction } from "./Actions";

/** @internal */
const runningInstancesMap = new Map<string, number>();

const createNamedFormEpic = (formName: string): TFormEpic =>
  (action$, state$, dependencies) => action$.pipe(
    isActionOfForm(formName),
    isCreator(mountFormAction, unmountFormAction),
    switchMap((action) => {
      const { metadata: { formName } } = action;

      if (!runningInstancesMap.has(formName)) {
        runningInstancesMap.set(formName, Date.now());
      }

      if (isMountFormAction(action)) {
        const { payload: { form }, metadata: { formName } } = action;

        const thisFormActions$ = concat(
          action$.pipe(
            isActionOfForm(formName),
          ),
        );

        return concat(
          of(formMountedAction(formName)),
          combineEpics(...form.epics as TFormEpic[])(thisFormActions$, state$, dependencies),
        );
      }

      unmountDecorators(formName);
      unmountExtensions(formName);

      return EMPTY;
    }),
  );

const formsRootEpic: TFormEpic = (action$, state$, dependencies) => action$.pipe(
  isCreator(mountFormAction),
  filter(({ metadata: { formName } }) => !runningInstancesMap.has(formName)),
  mergeMap((action) => createNamedFormEpic(action.metadata.formName)(concat(of(action), action$), state$, dependencies)),
);

export { formsRootEpic };
