import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { platformui_depositLimitOptions_noLimit } from "@sb/translates/platformui/CommonTKeys";
import { EMoneyFormat, Money } from "@sb/utils";
import { type ISelectOption } from "../../../common/Components/Field/SelectModel";
import { playerCurrencySelector } from "../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { type TDepositLimitOption } from "../../Store/SelfProtection/Model/DepositLimitOptions";
import { isNoLimit } from "../../Store/SelfProtection/Model/SelfProtectionInterval";

const DepositLimitOption = memo<ISelectOption<TDepositLimitOption>>(({ value }) => {
  const [t] = useTranslation();
  const currency = useSelector(playerCurrencySelector);

  return isNoLimit(value)
    ? t(platformui_depositLimitOptions_noLimit)
    : Money.toFormat(Money.parseAny(value, currency), EMoneyFormat.symbolRight);
});
DepositLimitOption.displayName = "DepositLimitOption";

export { DepositLimitOption };
