import { memo } from "react";
import { Translation, useTranslation } from "@sb/translator";
import { type TVoidFn, useActionWithBind, withProps } from "@sb/utils";
import {
  platformui_starzbet_bonus_availableBonusInfo_claim,
  platformui_starzbet_bonus_terms_claimRules,
  platformui_starzbet_vipClub_bonus_availableForClaimCard_text,
  platformui_starzbet_vipClub_bonus_cashBackCard_text,
  platformui_starzbet_vipClub_bonus_countdown_availableFor,
  platformui_starzbet_vipClub_bonus_countdown_willBeAvailableIn,
  platformui_starzbet_vipClub_bonus_limitWarning,
  platformui_starzbet_vipClub_bonus_limitWarning_birthday,
  platformui_starzbet_vipClub_bonus_passiveWarning,
  platformui_starzbet_vipClub_bonus_showClaimRulesButton_text,
  platformui_starzbet_vipClub_bonus_withDepositWarning_atLeastOneDeposit,
  platformui_starzbet_vipClub_bonus_withDepositWarning_base,
  platformui_starzbet_vipClub_bonus_withDepositWarning_maxSum,
  platformui_starzbet_vipClub_bonus_withDepositWarning_minSum,
  platformui_starzbet_vipClub_bonus_withDepositWarning_period_24hours,
  platformui_starzbet_vipClub_bonus_withDepositWarning_period_48hours,
  platformui_starzbet_vipClub_bonus_withDepositWarning_period_72hours,
  platformui_starzbet_vipClub_bonus_withDepositWarning_period_lastMonth,
  platformui_starzbet_vipClub_bonus_withDepositWarning_period_lastWeek,
  platformui_starzbet_vipClub_bonus_withDepositWarning_period_oneMonth,
  platformui_starzbet_vipClub_bonus_withDepositWarning_period_oneWeek,
  platformui_starzbet_vipClub_bonus_withDepositWarning_period_twoWeeks,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { EPlatform_BonusLastDepositsPeriodEnum } from "@sb/graphql-client";
import classes from "./VipClubBonus.module.css";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { updatePreferredCashbackBonusIdAction } from "../../../../../Store/Bonuses/BonusesActions";
import { type IVipClubBonusCardProps } from "../../../../../Store/VipClub/VipClubModels";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { VipClubBonusCardCountDown } from "../../../../../Components/VipClub/VipClubBonus/VipClubBonusCardCountDown";
import { VipClubBonusCardName } from "../../../../../Components/VipClub/VipClubBonus/VipClubBonusCardName";
import {
  VipClubBonusCardDescription,
} from "../../../../../Components/VipClub/VipClubBonus/VipClubBonusCardDescription";
import {
  type TVipClubBonusCardButtonProps,
  VipClubBonusCardButton,
} from "../../../../../Components/VipClub/VipClubBonus/VipClubBonusCardButton";
import {
  type IVipClubBonusCardMessageTKeys,
  VipClubBonusCardMessage,
} from "../../../../../Components/VipClub/VipClubBonus/VipClubBonusCardMessage";
import {
  createVipClubShowClaimRulesButton,
} from "../../../../../Components/VipClub/VipClubBonus/CreateVipClubShowClaimRulesButton";
import { DepositRule } from "../../../Desktop/Components/Bonuses/Rules/EligibilityRules/DepositRule/DepositRule";
import {
  EligibilityProductRules,
} from "../../../Desktop/Components/Bonuses/Rules/EligibilityRules/EligibilityProductRules/EligibilityProductRules";
import { CashbackButton } from "../../Bonuses/CashbackButton/CashbackButton";
import { BonusItemContext } from "../../Bonuses/BonusItemContext";
import { ThemedModal } from "../../ThemedModal/ThemedModal";
import { ThemedModalHeader } from "../../ThemedModal/ThemedModalHeader/ThemedModalHeader";
import { ClaimAvailableBonusButton } from "../../Bonuses/ClaimAvailableBonusButton/ClaimAvailableBonusButton";

const BonusCardClaimButton = memo<TVipClubBonusCardButtonProps>(({ id, disabled }) => {
  const [t] = useTranslation();

  return (
    <ClaimAvailableBonusButton
      colorScheme={"orange-gradient"}
      wide
      disabled={disabled}
      id={id}
    >
      {t(platformui_starzbet_vipClub_bonus_availableForClaimCard_text)}
    </ClaimAvailableBonusButton>
  );
});
BonusCardClaimButton.displayName = "BonusCardClaimButton";

const BonusCardCashbackButton = memo<TVipClubBonusCardButtonProps>(({ id, disabled }) => {
  const updatePreferredId = useActionWithBind(updatePreferredCashbackBonusIdAction, id);
  const [t] = useTranslation();

  return (
    <CashbackButton className={classes.wide} disabled={disabled}>
      <Button
        onClick={updatePreferredId}
        colorScheme={"orange-gradient"}
        wide
        disabled={disabled}
      >
        <Ellipsis>
          {t(platformui_starzbet_vipClub_bonus_cashBackCard_text)}
        </Ellipsis>
      </Button>
    </CashbackButton>
  );
});
BonusCardCashbackButton.displayName = "BonusCardCashbackButton";

const BONUS_CARD_MESSAGE_TKEYS: IVipClubBonusCardMessageTKeys = {
  passiveMessage: {
    common: platformui_starzbet_vipClub_bonus_passiveWarning,
  },
  withDepositMessage: {
    common: platformui_starzbet_vipClub_bonus_withDepositWarning_base,
    atLeastOneDeposit: platformui_starzbet_vipClub_bonus_withDepositWarning_atLeastOneDeposit,
    minSum: platformui_starzbet_vipClub_bonus_withDepositWarning_minSum,
    maxSum: platformui_starzbet_vipClub_bonus_withDepositWarning_maxSum,
    depositPeriod: {
      [EPlatform_BonusLastDepositsPeriodEnum.twentyFourHours]: platformui_starzbet_vipClub_bonus_withDepositWarning_period_24hours,
      [EPlatform_BonusLastDepositsPeriodEnum.fortyEightHours]: platformui_starzbet_vipClub_bonus_withDepositWarning_period_48hours,
      [EPlatform_BonusLastDepositsPeriodEnum.seventyTwoHours]: platformui_starzbet_vipClub_bonus_withDepositWarning_period_72hours,
      [EPlatform_BonusLastDepositsPeriodEnum.oneWeek]: platformui_starzbet_vipClub_bonus_withDepositWarning_period_oneWeek,
      [EPlatform_BonusLastDepositsPeriodEnum.lastWeek]: platformui_starzbet_vipClub_bonus_withDepositWarning_period_lastWeek,
      [EPlatform_BonusLastDepositsPeriodEnum.twoWeeks]: platformui_starzbet_vipClub_bonus_withDepositWarning_period_twoWeeks,
      [EPlatform_BonusLastDepositsPeriodEnum.oneMonth]: platformui_starzbet_vipClub_bonus_withDepositWarning_period_oneMonth,
      [EPlatform_BonusLastDepositsPeriodEnum.lastMonth]: platformui_starzbet_vipClub_bonus_withDepositWarning_period_lastMonth,
    },
  },
  bonusLimitMessage: {
    common: platformui_starzbet_vipClub_bonus_limitWarning,
    birthday: platformui_starzbet_vipClub_bonus_limitWarning_birthday,
  },
};

const createClaimRulesModal = (id: string) => (hideModal: TVoidFn) => {
  const context = { bonusId: id, forAvailable: true };

  return (
    <BonusItemContext.Provider value={context}>
      <ThemedModal onCancel={hideModal}>
        <ThemedModalHeader closeButtonClickHandler={hideModal}>
          <Translation tKey={platformui_starzbet_bonus_terms_claimRules} />
        </ThemedModalHeader>

        <div className={classes.modalContent}>
          <div className={classes.rules}>
            <DepositRule />

            <EligibilityProductRules />
          </div>

          <ClaimAvailableBonusButton colorScheme={"orange-gradient"} id={id}>
            <Translation tKey={platformui_starzbet_bonus_availableBonusInfo_claim} />
          </ClaimAvailableBonusButton>
        </div>
      </ThemedModal>
    </BonusItemContext.Provider>

  );
};

const ShowClaimRulesButton = createVipClubShowClaimRulesButton({
  Button: withProps(Button)({ wide: true, colorScheme: "orange-gradient", capitalize: true }),
  tKey: platformui_starzbet_vipClub_bonus_showClaimRulesButton_text,
  createClaimRulesModal,
});

const VipClubBonusCard = memo<IVipClubBonusCardProps>(({ id, type }) => (
  <div className={classes.vipClubBonusCard}>
    <VipClubBonusCardName id={id} className={classes.vipClubBonusCardName} />

    <VipClubBonusCardDescription id={id} className={classes.vipClubBonusCardDescription} />

    <VipClubBonusCardCountDown
      id={id}
      type={type}
      availableForTKey={platformui_starzbet_vipClub_bonus_countdown_availableFor}
      willBeAvailableInTKey={platformui_starzbet_vipClub_bonus_countdown_willBeAvailableIn}
      className={classes.vipClubBonusCardCountText}
      extraClassName={classes.vipClubBonusCardCountNumbers}
    />

    <VipClubBonusCardMessage id={id} tKeys={BONUS_CARD_MESSAGE_TKEYS} bonusType={type} />

    <VipClubBonusCardButton
      className={classes.vipClubBonusCardButtonWrapper}
      CashbackButton={BonusCardCashbackButton}
      ClaimButton={BonusCardClaimButton}
      ShowClaimRulesButton={ShowClaimRulesButton}
      id={id}
    />
  </div>
));
VipClubBonusCard.displayName = "VipClubBonusCard";

export { VipClubBonusCard };
