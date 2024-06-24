import clsx from "clsx";
import { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  sportsbookui_starzbet_betSlip_button_saveChanges,
  sportsbookui_starzbet_betSlip_button_saved,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { useAction } from "@sb/utils";
import { platformui_button_cancel } from "@sb/translates/platformui/CommonTKeys";
import classes from "./SaveChanges.module.css";
import { Button } from "../../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { TickIcon } from "../../../../../../../../common/Themes/Starzbet/Components/Icons/TickIcon/TickIcon";
import { savingEditableBetSelector } from "../../../../../../../Store/MyBets/Selectors/MyBetsSelectors";
import { usePrevious } from "../../../../../../../Hooks/UsePrevious";
import { cancelEditBetAction, saveEditBetAction } from "../../../../../../../Store/MyBets/MyBetsActions";

const useSaved = (editing: boolean) => {
  const saving = useSelector(savingEditableBetSelector);

  const prevSaving = usePrevious(saving);
  const prevEditing = usePrevious(editing);

  const timeout = useRef(null);

  const [saved, setSaved] = useState(false);

  useEffect(
    () => {
      if (prevEditing && prevSaving && !saving) {
        setSaved(true);

        timeout.current = setTimeout(setSaved, 1500, false);
      }
    },
    [saving],
  );

  useEffect(() => () => clearTimeout(timeout.current), []);

  return saved;
};

interface ISaveChangesProps {
  editing: boolean;
  disable: boolean;
  hasError: boolean;
}

const SaveChanges = memo<ISaveChangesProps>(({
  editing,
  disable,
  hasError,
}) => {
  const [t] = useTranslation();
  const saveEditBet = useAction(saveEditBetAction);
  const saved = useSaved(editing);
  const cancelEdit = useAction(cancelEditBetAction);

  if (saved && !hasError) {
    return (
      <div className={classes.buttonsWrapper}>
        <div className={clsx(classes.saveChanges, classes.saved)}>
          <TickIcon size={"m"} />

          {t(sportsbookui_starzbet_betSlip_button_saved)}
        </div>
      </div>
    );
  }

  if (!editing) {
    return null;
  }

  return (
    <div className={classes.buttons} onClick={cancelEdit}>
      <Button colorScheme={"secondary-grey"} wide>
        {t(platformui_button_cancel)}
      </Button>

      <Button
        colorScheme={"orange-gradient"}
        wide
        onClick={saveEditBet}
        disabled={disable}
      >
        {t(sportsbookui_starzbet_betSlip_button_saveChanges)}
      </Button>
    </div>
  );
});
SaveChanges.displayName = "SaveChanges";

export { SaveChanges };
