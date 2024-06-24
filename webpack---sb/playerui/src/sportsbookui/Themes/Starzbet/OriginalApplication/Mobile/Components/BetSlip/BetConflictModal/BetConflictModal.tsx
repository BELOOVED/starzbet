// @ts-nocheck
import { memo } from "react";
import {
  sportsbookui_starzbet_betConflict_title_thisSelectionCannotBeAddedToYourBet,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import {
  ThemedModalErrorMessage,
} from "../../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalPrefabs/ThemedModalMessage";
import { useModalCloseAction } from "../../../../../../../../common/Store/Modal/Hooks/UseModalCloseAction";
import { EModal } from "../../../../../../../../common/Store/Modal/Model/EModal";

const BetConflictModal = memo(() => {
  const closeHandler = useModalCloseAction(EModal.betConflict);

  const props = {
    subtitle: [sportsbookui_starzbet_betConflict_title_thisSelectionCannotBeAddedToYourBet] as const,
    hideModal: closeHandler,
  };

  return <ThemedModalErrorMessage {...props} />;
});
BetConflictModal.displayName = "BetConflictModal";

export { BetConflictModal };
