import { useSelector } from "react-redux";
import { memo } from "react";
import { ECurrencySymbol } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { type IWithTKey } from "../../../../common/IWith";
import { playerCurrencySelector } from "../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import {
  vipClubDoCommissionRefundStateSelector,
  vipClubMinAmountToRefundSelector,
} from "../../../Store/VipClub/Selectors/VipClubCommissionRefundSelectors";
import { EVipClubDoCommissionRefundState } from "../../../Store/VipClub/VipClubModels";

const JustText = memo<IWithTKey<string>>(({ tKey }) => {
  const [t] = useTranslation();

  return t(tKey);
});
JustText.displayName = "JustText";

const DisabledText = memo<IWithTKey<string>>(({ tKey }) => {
  const [t] = useTranslation();
  const amount = useSelector(vipClubMinAmountToRefundSelector);
  const currency = useSelector(playerCurrencySelector);

  return t(tKey, { amount, currency: ECurrencySymbol[currency] });
});
DisabledText.displayName = "DisabledText";

interface IVipClubCommissionRefundButtonTextProps {
  doRefundTKey: string;
  disabledTKey: string;
  okTKey: string;
}

const VipClubCommissionRefundButtonText = memo<IVipClubCommissionRefundButtonTextProps>(({
  okTKey,
  disabledTKey,
  doRefundTKey,
}) => {
  const state = useSelector(vipClubDoCommissionRefundStateSelector);

  if (state === EVipClubDoCommissionRefundState.loading) {
    return <JustText tKey={doRefundTKey} />;
  }

  if (state === EVipClubDoCommissionRefundState.success || state === EVipClubDoCommissionRefundState.failed) {
    return <JustText tKey={okTKey} />;
  }

  if (state === EVipClubDoCommissionRefundState.notAvailableForRefund) {
    return <DisabledText tKey={disabledTKey} />;
  }

  return <JustText tKey={doRefundTKey} />;
});
VipClubCommissionRefundButtonText.displayName = "VipClubCommissionRefundButtonText";

export { VipClubCommissionRefundButtonText };
