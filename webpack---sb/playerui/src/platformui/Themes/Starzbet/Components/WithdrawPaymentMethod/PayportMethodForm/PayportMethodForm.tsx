import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_menu_button_withdraw,
  platformui_starzbet_placeholder_select,
  platformui_starzbet_placeholder_selectMethod,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { FormWithWrapper, selectIsFormSubmittingStarted, useFormSelector } from "@sb/form-new";
import { useActionWithBind } from "@sb/utils";
import classes from "../WithdrawPaymentMethod.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import {
  payportActiveMethodSelector,
  payportMethodFormResponseSelector,
} from "../../../../../Store/Banking/Form/Payport/PayportFormSelectors";
import { bankingFormErrorFunction } from "../../../../../Store/Banking/Utils/BankingFormErrorFunction";
import { useFormSubmitResult } from "../../../../../Store/Form/Hooks/UseFormSubmitResult";
import { getPayportMethod, PAYPORT_METHOD_FORM, type TPayportMethod } from "../../../../../Store/Banking/Form/Payport/PayportFormModel";
import { payportMethodChangeAction } from "../../../../../Store/Banking/BankingActions";
import { PayportMethodIcon } from "../../../../../Components/PayportMethodIcon/PayportMethodIcon";
import { WithdrawForm } from "../../WithdrawForm/WithdrawForm";
import { BaseAmountForm } from "../../WithdrawForm/BaseAmountForm/BaseAmountForm";
import { DepositShowErrorModal } from "../../DepositForm/DepositShowErrorModal/DepositShowErrorModal";

const PayportMethod = memo<TPayportMethod>((method) => {
  const [t] = useTranslation();
  const handleChange = useActionWithBind(payportMethodChangeAction, method);

  return (
    <div onClick={handleChange} className={classes.paymentCard}>
      <PayportMethodIcon method={getPayportMethod(method.paymentSystemType)} />

      <div className={classes.paymentCardTitle}>
        {method.bankName}
      </div>

      <div className={classes.selectButton}>
        {t(platformui_starzbet_placeholder_select)}
      </div>
    </div>
  );
});
PayportMethod.displayName = "PayportMethod";

const PayportMethodList = memo(() => {
  const [t] = useTranslation();
  const payportMethods = useSelector(payportMethodFormResponseSelector);

  return (
    <>
      <div className={classes.method}>
        {t(platformui_starzbet_placeholder_selectMethod)}
      </div>

      <div className={classes.bankAccountList}>
        {payportMethods.map((method) => <PayportMethod {...method} key={method.paymentSystemType} />)}
      </div>
    </>
  );
});
PayportMethodList.displayName = "PayportMethodList";

const PayportFormContent = memo(() => {
  const [t] = useTranslation();
  const loading = useFormSelector(selectIsFormSubmittingStarted);

  const {
    submitSucceeded,
    submitErrors,
    reset,
  } = useFormSubmitResult(bankingFormErrorFunction);

  if (submitSucceeded) {
    return (
      <PayportMethodList />
    );
  }

  return (
    <div className={classes.form}>
      {submitErrors ? <DepositShowErrorModal {...submitErrors} hideModal={reset} /> : null}

      <BaseAmountForm />

      <Button
        colorScheme={"orange-gradient"}
        className={classes.button}
        loading={loading}
        type={"submit"}
        wide={IS_MOBILE_CLIENT_SIDE}
      >
        {t(platformui_starzbet_menu_button_withdraw)}
      </Button>
    </div>
  );
});
PayportFormContent.displayName = "PayportFormContent";

const PayportMethodForm = memo(() => {
  const payportMethod = useSelector(payportActiveMethodSelector);

  if (payportMethod) {
    return (
      <>
        <div className={classes.method}>
          {payportMethod.bankName}
        </div>

        <WithdrawForm />
      </>
    );
  }

  return (
    <FormWithWrapper
      formName={PAYPORT_METHOD_FORM}
      content={PayportFormContent}
    />
  );
});
PayportMethodForm.displayName = "PayportMethodForm";

export { PayportMethodForm };
