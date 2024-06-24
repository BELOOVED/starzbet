import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import type { TPlatform_PlayerPaymentAccount_Fragment } from "@sb/graphql-client/PlayerUI";
import { isEmpty } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_paymentAccount_title_addNewPaymentAccount,
  platformui_starzbet_paymentAccount_title_emptyData,
  platformui_starzbet_paymentAccount_title_savedPaymentAccounts,
  platformui_starzbet_placeholder_select,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { simpleValueExtractor, type TWithFieldPath } from "@sb/form-new";
import classes from "../WithdrawForm.module.css";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { Empty } from "../../../../../../common/Themes/Starzbet/Components/Empty/Empty";
import { CheckIcon } from "../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/CheckIcon/CheckIcon";
import { FieldCreator, type TFieldChildProps } from "../../../../../../common/Components/Field/FieldCreator";
import { Field } from "../../../../../../common/Themes/Starzbet/Components/Field/Field";
import { LinkLocalized } from "../../../../../../common/Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";
import { bankingAvailablePaymentAccountsSelector } from "../../../../../Store/Banking/Selectors/PlatformBankingSelectors";
import { usePaymentAccountHandler } from "../../../../../Store/Banking/Hooks/UsePaymentAccountHandler";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { PLAYER_PAYMENT_ACCOUNT_FORM_FIELD_PATHS } from "../../../../../Store/Banking/Form/BaseFormModel";
import { playerPaymentAccountsLoadingSelector } from "../../../../../Store/PaymentAccount/Selectors/PaymentAccountLoaderSelectors";
import { PaymentAccountCard } from "../../../Desktop/Components/PaymentAccount/PaymentAccountCard";

const Extra = memo(() => (
  <div className={classes.check}>
    <div className={classes.dot} />
  </div>
));
Extra.displayName = "Extra";

const PlayerPaymentAccount = memo<TPlatform_PlayerPaymentAccount_Fragment & TFieldChildProps<string>>(({
  onChange,
  value,
  ...account
}) => {
  const [t] = useTranslation();
  const isActive = value === account.id;
  const handleChange = () => onChange(isActive ? null : account.id);

  return (
    <div onClick={handleChange} className={clsx(classes.bankAccount, value === account.id && classes.active)}>
      <PaymentAccountCard {...account} short />

      <div className={classes.selectButton}>
        {t(platformui_starzbet_placeholder_select)}
      </div>

      <div className={classes.check}>
        {isActive ? <CheckIcon width={14} height={10} /> : null}
      </div>
    </div>
  );
});
PlayerPaymentAccount.displayName = "PlayerPaymentAccount";

const PlayerPaymentAccountSelect = memo<TFieldChildProps<string>>((props) => {
  const paymentAccounts = useSelector(bankingAvailablePaymentAccountsSelector);
  const loading = useSelector(playerPaymentAccountsLoadingSelector);

  if (loading) {
    return (
      <div className={classes.centerContainer}>
        <Loader />
      </div>
    );
  }

  if (isEmpty(paymentAccounts)) {
    return (
      <div className={classes.centerContainer}>
        <Empty messageTKey={platformui_starzbet_paymentAccount_title_emptyData} />
      </div>
    );
  }

  return (
    <div className={classes.bankAccountList}>
      {
        paymentAccounts.map((account) => (
          <PlayerPaymentAccount
            {...account}
            {...props}
            key={account.id}
          />
        ))
      }
    </div>
  );
});
PlayerPaymentAccountSelect.displayName = "PlayerPaymentAccountSelect";

const PlayerPaymentAccountField = memo<Partial<TWithFieldPath>>(({ fieldPath = [] }) => {
  const [t] = useTranslation();
  const to = usePaymentAccountHandler();

  const path = fieldPath.concat(PLAYER_PAYMENT_ACCOUNT_FORM_FIELD_PATHS.playerPaymentAccountId);

  return (
    <>
      <div className={classes.bankAccountControl}>
        <Ellipsis className={classes.savedBankAccounts}>
          {t(platformui_starzbet_paymentAccount_title_savedPaymentAccounts)}
        </Ellipsis>

        <LinkLocalized {...to} className={classes.addBankAccount}>
          {"+ "}

          {t(platformui_starzbet_paymentAccount_title_addNewPaymentAccount)}
        </LinkLocalized>
      </div>

      <FieldCreator<string>
        ThemedField={Field}
        fieldPath={path}
        valueExtractor={simpleValueExtractor}
        ghost
      >
        {
          (props) => (
            <PlayerPaymentAccountSelect {...props} />
          )
        }
      </FieldCreator>
    </>
  );
});
PlayerPaymentAccountField.displayName = "PlayerPaymentAccountField";

export { PlayerPaymentAccountField };
