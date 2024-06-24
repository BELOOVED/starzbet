import { memo } from "react";
import { useDispatch } from "react-redux";
import type { TPlatform_SystemBankAccount_Fragment } from "@sb/graphql-client/PlayerUI";
import { useTranslation } from "@sb/translator";
import { EMoneyFormat, Money } from "@sb/utils";
import {
  platformui_starzbet_paymentMethod_minMax,
  platformui_starzbet_placeholder_select,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "../DepositBankAccount.module.css";
import { PublicImage } from "../../../../../../common/Components/PublicImage";
import { platformBankAccountChangeAction } from "../../../../../Store/Banking/BankingActions";

const BankTransferAccount = memo<TPlatform_SystemBankAccount_Fragment>(({
  id,
  minDeposit,
  maxDeposit,
  bank: {
    name,
    logoFile,
  },
}) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const onClick = () => dispatch(platformBankAccountChangeAction(id));

  return (
    <div className={classes.bankAccountCard} onClick={onClick}>
      <div className={classes.bankAccountIcon}>
        <PublicImage pathToFile={logoFile.pathToFile} />
      </div>

      <div className={classes.bankAccountHeader}>
        <div className={classes.bankName}>
          {name}
        </div>

        <div className={classes.bankAccountDescription}>
          <div>
            {t(platformui_starzbet_paymentMethod_minMax)}
          </div>

          <div>
            {minDeposit ? Money.toFormat(minDeposit, EMoneyFormat.symbolRight) : "-"}

            {" / "}

            {maxDeposit ? Money.toFormat(maxDeposit, EMoneyFormat.symbolRight) : "-"}
          </div>
        </div>
      </div>

      <div className={classes.selectButton}>
        {t(platformui_starzbet_placeholder_select)}
      </div>
    </div>
  );
});
BankTransferAccount.displayName = "BankTransferAccount";

export { BankTransferAccount };
