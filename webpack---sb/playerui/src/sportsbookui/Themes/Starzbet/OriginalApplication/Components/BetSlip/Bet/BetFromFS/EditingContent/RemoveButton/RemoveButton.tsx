import { memo } from "react";
import { useActionWithBind, withParamCondition } from "@sb/utils";
import classes from "./RemoveButton.module.css";
import { TrashIcon } from "../../../../../../../../../../common/Themes/Starzbet/Components/Icons/TrashIcon/TrashIcon";
import { canRemovePickByIdSelector } from "../../../../../../../../../Store/MyBets/Selectors/EditablePickByIdSelector";
import { onRemovePickAction } from "../../../../../../../../../Store/MyBets/MyBetsActions";
import { RefreshIcon } from "../../../../../Icons/RefreshIcon/RefreshIcon";

interface IRemoveButtonProps {
  id: string;
  removed: boolean;
}

const RemoveButton = withParamCondition(
  canRemovePickByIdSelector,
  ["id"],
  memo<IRemoveButtonProps>(({ id, removed }) => {
    const removePick = useActionWithBind(onRemovePickAction, id);
    const props = {
      className: classes.removeButton,
      onClick: removePick,
    };

    return removed ? <RefreshIcon {...props} /> : <TrashIcon {...props} />;
  }),
);
RemoveButton.displayName = "RemoveButton";

export { RemoveButton };
