import clsx from "clsx";
import { memo, type MouseEventHandler, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  sportsbookui_starzbet_betSlip_editBet_button_cancel,
  sportsbookui_starzbet_betSlip_editBet_button_editBet,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { useAction, useActionWithBind } from "@sb/utils";
import classes from "./EditBetButton.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { modalOpenAction } from "../../../../../../../../../common/Store/Modal/ModalActions";
import { EModal } from "../../../../../../../../../common/Store/Modal/Model/EModal";
import { useCanEditBetSelector } from "../../../../../../../../Store/MyBets/Hooks/UseCanEditBetSelector";
import { editingByBetIdSelector } from "../../../../../../../../Store/MyBets/Selectors/MyBetsSelectors";
import { cancelEditBetAction, startEditBetAction } from "../../../../../../../../Store/MyBets/MyBetsActions";

const EditBetButtonBase = memo<IWithId>(({ id }) => {
  const [t] = useTranslation();
  const editing = useSelector(editingByBetIdSelector(id));

  const startEdit = useAction(startEditBetAction);
  const cancelEdit = useAction(cancelEditBetAction);
  const openModal = useActionWithBind(modalOpenAction, EModal.editBetTutorial, null, true);
  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      e.stopPropagation();
      if (editing) {
        cancelEdit();
      } else {
        openModal();
        startEdit(id, !IS_MOBILE_CLIENT_SIDE);
      }
    },
    [editing, id],
  );

  return (
    <button
      className={clsx(classes.editButton)}
      onClick={handleClick}
    >
      {
        editing
          ? t(sportsbookui_starzbet_betSlip_editBet_button_cancel)
          : t(sportsbookui_starzbet_betSlip_editBet_button_editBet)
      }
    </button>
  );
});
EditBetButtonBase.displayName = "EditBetButtonBase";

const EditBetButton = memo<IWithId>(({ id }) => {
  const canEditBet = useCanEditBetSelector(id);

  if (!canEditBet) {
    return null;
  }

  return <EditBetButtonBase id={id} />;
});
EditBetButton.displayName = "EditBetButton";

export { EditBetButton };
