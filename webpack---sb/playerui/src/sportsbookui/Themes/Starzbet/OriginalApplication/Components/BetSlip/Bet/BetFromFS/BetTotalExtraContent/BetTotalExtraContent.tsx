import { memo } from "react";
import { useSelector } from "react-redux";
import { sportsbookui_starzbet_betSlip_bet_title_editBetFailed } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { withProps } from "@sb/utils";
import { editableBetSelector, editingByBetIdSelector } from "../../../../../../../../Store/MyBets/Selectors/MyBetsSelectors";
import { OverlayModal } from "../../../../OverlayModal/OverlayModal";
import { ErrorModal } from "../../../../ErrorModal/ErrorModal";

const EditBetFailedModal = withProps(OverlayModal)({
  component: ErrorModal,
  subtitle: sportsbookui_starzbet_betSlip_bet_title_editBetFailed,
});

const BetTotalExtraContent = memo<IWithId>(({ id }) => {
  const editableBet = useSelector(editableBetSelector);
  const editing = useSelector(editingByBetIdSelector(id));

  if (!editing || !editableBet?.lastSaveError) {
    return null;
  }

  return (
    <EditBetFailedModal />
  );
});
BetTotalExtraContent.displayName = "BetTotalExtraContent";

export { BetTotalExtraContent };
