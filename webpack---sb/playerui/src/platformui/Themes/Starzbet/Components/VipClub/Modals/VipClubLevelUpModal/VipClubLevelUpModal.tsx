import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_vipClub_modal_levelUp_button,
  platformui_starzbet_vipClub_modal_levelUp_subtitle,
  platformui_starzbet_vipClub_modal_levelUp_title,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { usePersistCallback } from "@sb/utils";
import { useModalCloseAction } from "../../../../../../../common/Store/Modal/Hooks/UseModalCloseAction";
import { EModal } from "../../../../../../../common/Store/Modal/Model/EModal";
import { vipClubLevelUpModalSelector } from "../../../../../../../common/Store/Modal/Selectors/ModalSelectors";
import { useLocalizedPushPath } from "../../../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { ThemedModalMessage } from "../../../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";

const props = {
  iconVariant: "party",
  subtitle: [platformui_starzbet_vipClub_modal_levelUp_subtitle],
  okButtonText: [platformui_starzbet_vipClub_modal_levelUp_button],
} as const;

const VipClubLevelUpModal = memo(() => {
  const hideModal = useModalCloseAction(EModal.vipClubLevelUp);
  const goToVipClub = useLocalizedPushPath(routeMap.vipClubRoute);
  const level = useSelector(vipClubLevelUpModalSelector);

  const okButtonHandler = usePersistCallback(() => {
    goToVipClub();
    hideModal();
  });

  const title = [platformui_starzbet_vipClub_modal_levelUp_title, { level }] as const;

  return (
    <ThemedModalMessage
      title={title}
      okButtonHandler={okButtonHandler}
      hideModal={hideModal}
      {...props}
    />
  );
});
VipClubLevelUpModal.displayName = "VipClubLevelUpModal";

export { VipClubLevelUpModal };
