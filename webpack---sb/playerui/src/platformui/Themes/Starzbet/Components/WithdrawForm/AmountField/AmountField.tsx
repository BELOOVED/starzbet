import { memo } from "react";
import {
  platformui_starzbet_placeholder_enterAmount,
  platformui_starzbet_title_withdrawAmount,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { type IMoney } from "@sb/utils";
import { simpleValueExtractor } from "@sb/form-new";
import { FieldCreator } from "../../../../../../common/Components/Field/FieldCreator";
import { Field } from "../../../../../../common/Themes/Starzbet/Components/Field/Field";
import { MoneyInput } from "../../../../../../common/Themes/Starzbet/Components/MoneyInput/MoneyInput";
import { WITHDRAW_BASE_AMOUNT_FIELD_PATHS } from "../../../../../Store/Banking/Form/WithdrawFormConfig";

const AmountField = memo(() => {
  const [t] = useTranslation();

  return (
    <FieldCreator<IMoney>
      ThemedField={Field}
      fieldPath={WITHDRAW_BASE_AMOUNT_FIELD_PATHS.amount}
      label={t(platformui_starzbet_title_withdrawAmount)}
      valueExtractor={simpleValueExtractor}
    >
      {
        (props) => (
          <MoneyInput
            placeholder={t.plain(platformui_starzbet_placeholder_enterAmount)}
            {...props}
          />
        )
      }
    </FieldCreator>
  );
});
AmountField.displayName = "AmountField";

export { AmountField };
