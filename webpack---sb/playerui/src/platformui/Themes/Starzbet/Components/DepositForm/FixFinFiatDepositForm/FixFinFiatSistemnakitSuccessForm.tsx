import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_title_paparaFullName,
  platformui_starzbet_title_paparaId,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "../DepositForm.module.css";
import { depositFixFinFiatSistemnakitFormResponseInfoSelectors } from "../../../../../Store/Banking/Form/FixFin/FixFinFiatFormSelectors";
import { DepositFormItem } from "../DepositFormItem";

const FixFinFiatSistemnakitSuccessForm = memo(() => {
  const paparaId = useSelector(depositFixFinFiatSistemnakitFormResponseInfoSelectors.paparaId);
  const paparaFullName = useSelector(depositFixFinFiatSistemnakitFormResponseInfoSelectors.paparaFullName);

  return (
    <div className={classes.formGroup}>
      <div className={classes.formGroupItem}>
        <DepositFormItem title={platformui_starzbet_title_paparaId} value={paparaId} withCopy />

        <DepositFormItem title={platformui_starzbet_title_paparaFullName} value={paparaFullName} />
      </div>
    </div>
  );
});
FixFinFiatSistemnakitSuccessForm.displayName = "FixFinFiatSistemnakitSuccessForm";

export { FixFinFiatSistemnakitSuccessForm };
