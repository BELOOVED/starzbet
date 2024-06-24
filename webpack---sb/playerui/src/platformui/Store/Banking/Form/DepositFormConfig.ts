import { type Action, type AnyAction } from "redux";
import { EMPTY, merge, type ObservableInput } from "rxjs";
import {
  createForm,
  disableExtension,
  form,
  type IFormAction,
  selectFieldValue,
  submittingExtension,
  type TFieldDefs,
  type TFormEpic,
  validationExtension,
} from "@sb/form-new";
import { getLocalStorage, localStorageKeys, setLocalStorage } from "../../../../common/Store/LocalStorage/localStorageKeys";
import { formSubmitEpicFactory, type TFormSubmitEpicParams } from "../../../Utils/FormSubmitEpicFactory";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { EMPTY_DECORATOR_LIST, formResetDecorator, type TDecorator } from "../../Form/Utils/FormResetDecorator";
import { DEPOSIT_FORM } from "../Utils/Variables";
import { DEPOSIT_BASE_FIELD_PATHS, DEPOSIT_BASE_FIELDS } from "./BaseFormModel";
import { type TFormInitialStateSelector } from "./WithdrawFormInitialStateSelectorMap";
import { depositFormBonusFieldDecorator } from "./DepositFormBonusFieldDecorator";

const EMPTY_FIELDS: TFieldDefs = {};

type TGetDepositFormConfig<K extends string, P, R> = {
  fields?: TFieldDefs<K, TPlatformAppState>;
  decorators?: TDecorator[];
  epic?: TFormEpic<IFormAction, AnyAction, TPlatformAppState>;
} & TFormSubmitEpicParams<R, P>

const getDepositFormConfig = <K extends string, P, R>({
  fields = EMPTY_FIELDS,
  decorators = EMPTY_DECORATOR_LIST,
  epic = () => EMPTY,
  onSuccess,
  ...rest
}: TGetDepositFormConfig<K, P, R>) => (initialStateSelector?: TFormInitialStateSelector) => {
    const decoratorList = [...decorators];

    if (initialStateSelector) {
      decoratorList.push(formResetDecorator(DEPOSIT_FORM, initialStateSelector));
    }

    decoratorList.push(depositFormBonusFieldDecorator);

    return createForm<TPlatformAppState>({
      extensions: [submittingExtension, validationExtension, disableExtension],

      form: form({
        fields: {
          ...fields,
          ...DEPOSIT_BASE_FIELDS,
        },
      }),

      epics: [
        formSubmitEpicFactory({
          formName: DEPOSIT_FORM,
          onSuccess: (response) => (action$, state$, deps) => {
            const input$: ObservableInput<Action>[] = [];

            if (onSuccess) {
              input$.push(onSuccess(response)(action$, state$, deps));
            }

            const bonusIdToClaim = selectFieldValue<string>(state$.value, DEPOSIT_FORM, DEPOSIT_BASE_FIELD_PATHS.depositPromotionBonusId);

            if (bonusIdToClaim) {
              const awaitedBonusIds = getLocalStorage<string[]>(localStorageKeys.awaitedPromotionBonusIds) ?? [];

              if (!awaitedBonusIds.includes(bonusIdToClaim)) {
                setLocalStorage(localStorageKeys.awaitedPromotionBonusIds, [...awaitedBonusIds, bonusIdToClaim]);
              }
            }

            return merge(...input$);
          },
          ...rest,
        }),
        epic,
      ],

      decorators: decoratorList,
    });
  };

export { getDepositFormConfig };
