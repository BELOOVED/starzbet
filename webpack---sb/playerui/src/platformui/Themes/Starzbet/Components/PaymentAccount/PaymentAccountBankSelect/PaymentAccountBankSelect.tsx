import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import { useParamSelector, withProps } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_paymentAccount_title_bankName,
  platformui_starzbet_placeholder_selectBank,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import { type IWithFieldPath } from "@sb/form-new";
import classes from "./PaymentAccountBankSelect.module.css";
import { SelectField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { type ISelectOption } from "../../../../../../common/Components/Field/SelectModel";
import { PublicImage } from "../../../../../../common/Components/PublicImage";
import {
  platformBankNameSelector,
  platformBanksOptionsSelector,
  platformBankTransferBankIconSelector,
  platformFixFinBankSelector,
} from "../../../../../Store/Banking/Selectors/PlatformBankingSelectors";
import {
  EPaymentAccountBankAccount,
  type TPaymentAccountBankAccountDefaultForm,
  type TWithPaymentAccountBankAccountSelectProps,
} from "../../../../../Store/PaymentAccount/Models/PaymentAccountTypeModel";
import { BANK_ACCOUNT_BASE_DETAILS_FIELD_PATHS } from "../../../../../Store/PaymentAccount/Form/BankAccount/BankAccountForm";
import { FixFinBankIcon } from "../../FixFinFiatHavaleBankAccount/FixFinFiatHavaleBankAccount";

const BankTransferBankIcon = memo<IWithId>(({ id }) => {
  const pathToFile = useParamSelector(platformBankTransferBankIconSelector, [id]);

  return (
    <div className={classes.icon}>
      <PublicImage pathToFile={pathToFile} />
    </div>
  );
});
BankTransferBankIcon.displayName = "BankTransferBankIcon";

const FixFinBankAccountIcon = memo<IWithId>(({ id }) => {
  const bank = useParamSelector(platformFixFinBankSelector, [id]);

  return (
    <div className={classes.icon}>
      <FixFinBankIcon bank={bank.name} logo={bank.logo} />
    </div>
  );
});
FixFinBankAccountIcon.displayName = "FixFinBankAccountIcon";

const iconPerAccountTypeMap: Record<TPaymentAccountBankAccountDefaultForm, ComponentType<IWithId>> = {
  [EPaymentAccountBankAccount.bankTransfer]: BankTransferBankIcon,
  [EPaymentAccountBankAccount.trHavaleEft]: FixFinBankAccountIcon,
};

const BankOption = memo<TWithPaymentAccountBankAccountSelectProps & ISelectOption<string>>(({ value, accountKind }) => {
  const bankName = useParamSelector(platformBankNameSelector, [value]);

  return (
    <div className={classes.option}>
      {createElement(iconPerAccountTypeMap[accountKind], { id: value })}

      {bankName}
    </div>
  );
});
BankOption.displayName = "BankOption";

const PaymentAccountBankSelect = memo<TWithPaymentAccountBankAccountSelectProps & IWithFieldPath>(({ accountKind, fieldPath }) => {
  const [t] = useTranslation();

  const banksOptions = useSelector(platformBanksOptionsSelector);

  return (
    <SelectField<string>
      fieldPath={fieldPath.concat(BANK_ACCOUNT_BASE_DETAILS_FIELD_PATHS.bank)}
      options={banksOptions}
      placeholder={t.plain(platformui_starzbet_placeholder_selectBank)}
      label={t(platformui_starzbet_paymentAccount_title_bankName)}
      qaAttributeSelect={PlayerUIQaAttributes.PaymentAccountsPage.BankNameSelect}
      qaAttributeOption={PlayerUIQaAttributes.PaymentAccountsPage.BankNameOption}
      optionComponent={withProps(BankOption)({ accountKind })}
    />
  );
});
PaymentAccountBankSelect.displayName = "PaymentAccountBankSelect";

export { PaymentAccountBankSelect };
