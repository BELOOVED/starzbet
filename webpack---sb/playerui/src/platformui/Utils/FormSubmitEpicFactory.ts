import { EMPTY, from, merge, type Observable, of, switchMap } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  ifFormValid,
  isFormCreator,
  type IWithFormName,
  submitFormAction,
  submitFormFailedAction,
  submitFormSucceedAction,
} from "@sb/form-new";
import { isFunction, type TRequireOnlyOne, type TSelector } from "@sb/utils";
import { type TCall } from "@sb/sdk";
import { type IError } from "@sb/network-bus/Model";
import { type IDepsWithPlatformHttpApi, type TPlatformEpic } from "../Store/Root/Epic/TPlatformEpic";
import { formSentryCapture } from "../Store/Form/Utils/FormSentryCapture";
import { type TPlatformAppState } from "../Store/PlatformInitialState";

type TFormCreateCall<R, V extends string = string> = (
  state: TPlatformAppState,
  deps: IDepsWithPlatformHttpApi,
  value: V | undefined,
) => Observable<R>

type TFormSubmitEpicParams<R, P, V extends string = string> = {
  onSuccess?: (response: R) => TPlatformEpic;
  onError?: (error: IError[]) => TPlatformEpic;
} & TRequireOnlyOne<{
  createCall: TFormCreateCall<R, V>;
  callPair: [call: TCall<P, R>, payload: P | TSelector<TPlatformAppState, P>];
}>

const formSubmitEpicFactory = <R, P, V extends string>({
  formName,
  onSuccess,
  onError,
  createCall,
  callPair,
}: TFormSubmitEpicParams<R, P, V> & IWithFormName): TPlatformEpic =>
    (action$, state$, deps) => action$.pipe(
      isFormCreator(formName)(submitFormAction<V>),
      ifFormValid(formName)(state$),
      switchMap(({ payload: { value } }) => {
        let call$: Observable<R>;

        if (createCall) {
          call$ = createCall(state$.value, deps, value);
        } else {
          const [call, payload] = callPair;

          call$ = from(
            deps.platformHttpApi._callToPlatform(
              call,
              isFunction(payload) ? payload(state$.value) : payload,
            ),
          );
        }

        return call$.pipe(
          switchMap((response) => merge(
            onSuccess ? onSuccess(response)(action$, state$, deps) : EMPTY,
            of(submitFormSucceedAction(formName)),
          )),
          catchError((error: IError[]) => {
            formSentryCapture(error, formName);

            return merge(
              onError ? onError(error)(action$, state$, deps) : EMPTY,
              of(submitFormFailedAction(formName, error)),
            );
          }),
        );
      }),
    );

export type { TFormCreateCall, TFormSubmitEpicParams };
export { formSubmitEpicFactory };
