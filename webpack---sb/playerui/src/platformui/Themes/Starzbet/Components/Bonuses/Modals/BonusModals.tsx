import { memo } from "react";
import { withProps } from "@sb/utils";
import {
  platformui_starzbet_bonusActivatedModal_title,
  platformui_starzbet_bonusCanceledModal_title,
  platformui_starzbet_bonusClaimedModal_title,
  platformui_starzbet_bonusCompletedModal_title,
  platformui_starzbet_bonusLostModal_subtitle,
  platformui_starzbet_bonusLostModal_title,
  platformui_starzbet_bonusModal_button_viewHistory,
  platformui_starzbet_bonusModal_button_viewNow,
  platformui_starzbet_bonusWonModal_title,
  platformui_starzbet_button_gotIt,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import {
  createClaimBonusByPromoCodeFailedModal,
} from "../../../../../../common/Components/Bonuses/Modals/CreateClaimBonusByPromoCodeFailedModal";
import {
  createBonusNoLongerAvailableModal,
} from "../../../../../../common/Components/Bonuses/Modals/CreateBonusNoLongerAvailableModal";
import {
  createClaimBonusFailedModal,
} from "../../../../../../common/Components/Bonuses/Modals/CreateClaimBonusFailedModal";
import {
  createActivateBonusFailedModal,
} from "../../../../../../common/Components/Bonuses/Modals/CreateActivateBonusFailedModal";
import { createBonusClaimedModal } from "../../../../../../common/Components/Bonuses/Modals/CreateBonusClaimedModal";
import {
  createBonusActivatedModal,
} from "../../../../../../common/Components/Bonuses/Modals/CreateBonusActivatedModal";
import { createBonusCanceledModal } from "../../../../../../common/Components/Bonuses/Modals/CreateBonusCanceledModal";
import { createBonusLostModal } from "../../../../../../common/Components/Bonuses/Modals/CreateBonusLostModal";
import { createBonusWonModal } from "../../../../../../common/Components/Bonuses/Modals/CreateBonusWonModal";
import {
  createBonusCompletedModal,
} from "../../../../../../common/Components/Bonuses/Modals/CreateBonusCompletedModal";
import { ThemedModalErrorMessage } from "../../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";
import { ThemedModalPrompt } from "../../ThemedModal/ThemedModalPrefabs/ThemedModalPrompt";

const BonusClaimedPrompt = withProps(ThemedModalPrompt)({
  iconVariant: "bonus",
  title: [platformui_starzbet_bonusClaimedModal_title],
  okButtonText: [platformui_starzbet_bonusModal_button_viewNow],
  cancelButtonText: [platformui_starzbet_button_gotIt],
});

const BonusActivatedPrompt = withProps(ThemedModalPrompt)({
  title: [platformui_starzbet_bonusActivatedModal_title],
  okButtonText: [platformui_starzbet_bonusModal_button_viewNow],
  cancelButtonText: [platformui_starzbet_button_gotIt],
  iconVariant: "bonus",
});

const BonusCanceledPrompt = withProps(ThemedModalPrompt)({
  title: [platformui_starzbet_bonusCanceledModal_title],
  okButtonText: [platformui_starzbet_bonusModal_button_viewHistory],
  cancelButtonText: [platformui_starzbet_button_gotIt],
});

const BonusLostPrompt = withProps(ThemedModalPrompt)({
  title: [platformui_starzbet_bonusLostModal_title],
  subtitle: [platformui_starzbet_bonusLostModal_subtitle],
  okButtonText: [platformui_starzbet_bonusModal_button_viewHistory],
  cancelButtonText: [platformui_starzbet_button_gotIt],
});

const BonusWonPrompt = withProps(ThemedModalPrompt)({
  iconVariant: "bonus",
  title: [platformui_starzbet_bonusWonModal_title],
  okButtonText: [platformui_starzbet_bonusModal_button_viewHistory],
  cancelButtonText: [platformui_starzbet_button_gotIt],
});

const BonusCompletedPrompt = withProps(ThemedModalPrompt)({
  title: [platformui_starzbet_bonusCompletedModal_title],
  okButtonText: [platformui_starzbet_bonusModal_button_viewHistory],
  cancelButtonText: [platformui_starzbet_button_gotIt],
});

const BonusClaimedModal = createBonusClaimedModal(BonusClaimedPrompt);
const BonusActivatedModal = createBonusActivatedModal(BonusActivatedPrompt);
const BonusCanceledModal = createBonusCanceledModal(BonusCanceledPrompt);
const BonusLostModal = createBonusLostModal(BonusLostPrompt);
const BonusWonModal = createBonusWonModal(BonusWonPrompt);
const BonusCompletedModal = createBonusCompletedModal(BonusCompletedPrompt);

const ClaimBonusByPromoCodeFailedModal = createClaimBonusByPromoCodeFailedModal(ThemedModalErrorMessage);
const BonusNoLongerAvailableModal = createBonusNoLongerAvailableModal(ThemedModalErrorMessage);
const ClaimBonusFailedModal = createClaimBonusFailedModal(ThemedModalErrorMessage);
const ActivateBonusFailedModal = createActivateBonusFailedModal(ThemedModalErrorMessage);

const BonusModals = memo(() => (
  <>
    <BonusClaimedModal />

    <BonusActivatedModal />

    <BonusCanceledModal />

    <BonusLostModal />

    <BonusWonModal />

    <BonusCompletedModal />

    <ClaimBonusByPromoCodeFailedModal />

    <BonusNoLongerAvailableModal />

    <ClaimBonusFailedModal />

    <ActivateBonusFailedModal />
  </>
));
BonusModals.displayName = "BonusModals";

export { BonusModals };
