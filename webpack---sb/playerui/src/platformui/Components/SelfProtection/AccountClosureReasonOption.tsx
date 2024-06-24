import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_accountClosure_reason_doNotHaveTime,
  platformui_accountClosure_reason_notHappyWithYourOffers,
  platformui_accountClosure_reason_notHappyWithYourService,
  platformui_accountClosure_reason_notInterestedInOnlineGambling,
  platformui_accountClosure_reason_preferNotToSpecify,
  platformui_accountClosure_reason_wantToPlayAtDifferentProvider,
  type TCommonTKeys,
} from "@sb/translates/platformui/CommonTKeys";
import { type ISelectOption } from "../../../common/Components/Field/SelectModel";
import { EAccountClosureReason } from "../../Store/SelfProtection/Form/AccountClosure/AccountClosureFormModel";

const ACCOUNT_CLOSURE_REASON_TRANSLATE_MAP: Record<EAccountClosureReason, TCommonTKeys> = {
  [EAccountClosureReason.TIME]: platformui_accountClosure_reason_doNotHaveTime,
  [EAccountClosureReason.INTERESTED]: platformui_accountClosure_reason_notInterestedInOnlineGambling,
  [EAccountClosureReason.HAPPYSERVICE]: platformui_accountClosure_reason_notHappyWithYourService,
  [EAccountClosureReason.HAPPYOFFERS]: platformui_accountClosure_reason_notHappyWithYourOffers,
  [EAccountClosureReason.PLAY]: platformui_accountClosure_reason_wantToPlayAtDifferentProvider,
  [EAccountClosureReason.PREFER]: platformui_accountClosure_reason_preferNotToSpecify,
};

const AccountClosureReasonOption = memo<ISelectOption<EAccountClosureReason>>(({ value }) => {
  const [t] = useTranslation();

  return t(ACCOUNT_CLOSURE_REASON_TRANSLATE_MAP[value]);
});
AccountClosureReasonOption.displayName = "AccountClosureReasonOption";

export { AccountClosureReasonOption };
