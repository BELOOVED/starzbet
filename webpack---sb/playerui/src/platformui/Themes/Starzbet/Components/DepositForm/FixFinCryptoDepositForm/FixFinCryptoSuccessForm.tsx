import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_deposit_label_cryptoSuccess,
  platformui_starzbet_title_coin,
  platformui_starzbet_title_cryptoAddress,
  platformui_starzbet_title_depositAmount,
  platformui_starzbet_title_network,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "../DepositForm.module.css";
import { TickIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/TickIcon/TickIcon";
import { depositFixFinCryptoFormResponseSelector } from "../../../../../Store/Banking/Form/FixFin/FixFinCryptoFormSelectors";
import { DepositFormItem } from "../DepositFormItem";

const FixFinCryptoSuccessForm = memo(() => {
  const [t] = useTranslation();
  const response = useSelector(depositFixFinCryptoFormResponseSelector);

  return (
    <>
      <div className={classes.label}>
        <TickIcon size={"m"} color={"green"} />

        <span
          className={classes.labelTitle}
        >
          {t(platformui_starzbet_deposit_label_cryptoSuccess, { value: `${response.amount} ${response.coin}` })}
        </span>
      </div>

      <div className={classes.formGroupItem}>
        <DepositFormItem title={platformui_starzbet_title_depositAmount} value={response.amount} />

        <DepositFormItem title={platformui_starzbet_title_coin} value={response.coin} />

        <DepositFormItem title={platformui_starzbet_title_network} value={response.network} />

        <DepositFormItem title={platformui_starzbet_title_cryptoAddress} value={response.address} withCopy />
      </div>
    </>
  );
});
FixFinCryptoSuccessForm.displayName = "FixFinCryptoSuccessForm";

export { FixFinCryptoSuccessForm };
