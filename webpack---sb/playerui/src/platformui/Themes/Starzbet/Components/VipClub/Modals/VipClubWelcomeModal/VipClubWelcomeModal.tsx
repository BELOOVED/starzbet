import { memo } from "react";
import {
  platformui_starzbet_vipClub_modal_welcome_button,
  platformui_starzbet_vipClub_modal_welcome_subtitle,
  platformui_starzbet_vipClub_modal_welcome_title,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { usePersistCallback } from "@sb/utils";
import { useModalCloseAction } from "../../../../../../../common/Store/Modal/Hooks/UseModalCloseAction";
import { EModal } from "../../../../../../../common/Store/Modal/Model/EModal";
import { useLocalizedPushPath } from "../../../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { ThemedModalMessage } from "../../../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";

const props = {
  iconVariant: "crown",
  title: [platformui_starzbet_vipClub_modal_welcome_title],
  subtitle: [platformui_starzbet_vipClub_modal_welcome_subtitle],
  okButtonText: [platformui_starzbet_vipClub_modal_welcome_button],
} as const;

const VipClubWelcomeModal = memo(() => {
  const hideModal = useModalCloseAction(EModal.vipClubWelcome);
  const goToVipClub = useLocalizedPushPath(routeMap.vipClubRoute);

  const okButtonHandler = usePersistCallback(() => {
    goToVipClub();
    hideModal();
  });

  return <ThemedModalMessage okButtonHandler={okButtonHandler} hideModal={hideModal} {...props} />;
});
VipClubWelcomeModal.displayName = "VipClubWelcomeModal";

export { VipClubWelcomeModal };
