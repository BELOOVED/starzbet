import { memo } from "react";
import { useDispatch } from "react-redux";
import type { TPlatform_KolayPayBankAccount_Fragment } from "@sb/graphql-client/PlayerUI";
import { useTranslation } from "@sb/translator";
import { EMoneyFormat, Money } from "@sb/utils";
import {
  platformui_starzbet_paymentMethod_minMax,
  platformui_starzbet_placeholder_select,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "../DepositBankAccount.module.css";
import { PublicImage } from "../../../../../../common/Components/PublicImage";
import { platformBankAccountChangeAction } from "../../../../../Store/Banking/BankingActions";

const KolayPayAccount = memo<TPlatform_KolayPayBankAccount_Fragment>(({
  bankAccountId,
  bank,
  min,
  bankLogoFile,
}) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const onClick = () => dispatch(platformBankAccountChangeAction(bankAccountId));

  return (
    <div className={classes.bankAccountCard} onClick={onClick}>
      <div className={classes.bankAccountIcon}>
        <PublicImage pathToFile={bankLogoFile.pathToFile} />
      </div>

      <div className={classes.bankAccountHeader}>
        <div className={classes.bankName}>
          {bank}
        </div>

        <div className={classes.bankAccountDescription}>
          <div>
            {t(platformui_starzbet_paymentMethod_minMax)}
          </div>

          <div>
            {min ? Money.toFormat(min, EMoneyFormat.symbolRight) : "-"}

            {" / "}

            {"-"}
          </div>
        </div>
      </div>

      <div className={classes.selectButton}>
        {t(platformui_starzbet_placeholder_select)}
      </div>
    </div>
  );
});
KolayPayAccount.displayName = "KolayPayAccount";

export { KolayPayAccount };
