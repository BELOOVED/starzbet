import { memo } from "react";
import { useSelector } from "react-redux";
import { EMoneyFormat, Money, useAction, withCondition, withProps } from "@sb/utils";
import {
  platformui_starzbet_bonusActivatedModal_title,
  platformui_starzbet_bonusCanceledModal_title,
  platformui_starzbet_bonusCompletedModal_title,
  platformui_starzbet_bonusLostModal_subtitle,
  platformui_starzbet_bonusLostModal_title,
  platformui_starzbet_bonusProceededToWageringModal_title,
  platformui_starzbet_bonusWonModal_title,
  platformui_starzbet_button_gotIt,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import type { TFuncWithPlain } from "@sb/translator";
import { playerBonusWalletBalanceAssertedSelector } from "../../../../../common/Store/Player/Selectors/PlayerSelectors";
import {
  isBonusActivatedModalVisibleSelector,
  isBonusCanceledModalVisibleSelector,
  isBonusCompletedModalVisibleSelector,
  isBonusLostModalVisibleSelector,
  isBonusProceededToWageringStageModalVisibleSelector,
  isBonusWonModalVisibleSelector,
} from "../../../../Store/PlayGame/BonusMatchedWithGameSelectors";
import { playGamePlayerBonusRemoveAllEventDataAction } from "../../../../Store/PlayGame/PlayGameActions";
import { ThemedModalPrompt, type TThemedModalPromptProps } from "../ThemedModal/ThemedModalPrefabs/ThemedModalPrompt";

const okButtonText: Readonly<Parameters<TFuncWithPlain>> = [platformui_starzbet_button_gotIt];

const BaseBonusInfoModal = memo<Omit<TThemedModalPromptProps, "onOk" | "disableLockBodyScroll" | "okButtonText">>((props) => {
  const handleOk = useAction(playGamePlayerBonusRemoveAllEventDataAction);

  return (
    <ThemedModalPrompt
      {...props}
      onOk={handleOk}
      disableLockBodyScroll
      okButtonText={okButtonText}
    />
  );
});
BaseBonusInfoModal.displayName = "BaseBonusInfoModal";

const BonusActivatedModal = withCondition(
  isBonusActivatedModalVisibleSelector,
  withProps(BaseBonusInfoModal)({
    title: [platformui_starzbet_bonusActivatedModal_title],
    iconVariant: "bonus",
  }),
);
BonusActivatedModal.displayName = "BonusActivatedModal";

const BonusCanceledModal = withCondition(
  isBonusCanceledModalVisibleSelector,
  withProps(BaseBonusInfoModal)({
    title: [platformui_starzbet_bonusCanceledModal_title],
  }),
);
BonusCanceledModal.displayName = "BonusCanceledModal";

const BonusCompletedModal = withCondition(
  isBonusCompletedModalVisibleSelector,
  withProps(BaseBonusInfoModal)({
    title: [platformui_starzbet_bonusCompletedModal_title],
  }),
);
BonusCompletedModal.displayName = "BonusCompletedModal";

const BonusLostModal = withCondition(
  isBonusLostModalVisibleSelector,
  withProps(BaseBonusInfoModal)({
    title: [platformui_starzbet_bonusLostModal_title],
    subtitle: [platformui_starzbet_bonusLostModal_subtitle],
  }),
);
BonusLostModal.displayName = "BonusLostModal";

const BonusWonModal = withCondition(
  isBonusWonModalVisibleSelector,
  withProps(BaseBonusInfoModal)({
    iconVariant: "bonus",
    title: [platformui_starzbet_bonusWonModal_title],
  }),
);
BonusWonModal.displayName = "BonusWonModal";

const ProceededToWageringStageModal = withCondition(
  isBonusProceededToWageringStageModalVisibleSelector,
  memo(() => {
    const bonusWalletBalance = useSelector(playerBonusWalletBalanceAssertedSelector);
    const money = Money.toFormat(bonusWalletBalance, EMoneyFormat.symbolLeft);

    const title: Readonly<Parameters<TFuncWithPlain>> = [platformui_starzbet_bonusProceededToWageringModal_title, { money }];

    return <BaseBonusInfoModal title={title} />;
  }),
);
ProceededToWageringStageModal.displayName = "ProceededToWageringStageModal";

const BonusGameWindowModals = memo(() => (
  <>
    <BonusActivatedModal />

    <ProceededToWageringStageModal />

    <BonusCanceledModal />

    <BonusLostModal />

    <BonusWonModal />

    <BonusCompletedModal />
  </>
));
BonusGameWindowModals.displayName = "BonusGameWindowModals";

export { BonusGameWindowModals };
