import { type ComponentType, memo, useCallback } from "react";
import { useActionWithBind, withCondition } from "@sb/utils";
import { isBonusCanceledEventReceivedSelector } from "../../../../platformui/Store/Bonuses/Selectors/BonusesSelectors";
import { bonusEventDataModalClosedAction } from "../../../../platformui/Store/Bonuses/BonusesActions";
import { routeMap } from "../../../../platformui/RouteMap/RouteMap";
import type { TModalPromptActionProps } from "../../../Store/Modal/Model/TModalPromptActionProps";
import { useLocalizedPushPath } from "../../../Client/Core/Services/RouterService/Hooks/UseLocalizedPush";

// do not use it on Baywin, another logic cause GamePage in main App
const createBonusCanceledModal = (
  BonusCanceledPrompt: ComponentType<TModalPromptActionProps>,
) => withCondition(
  isBonusCanceledEventReceivedSelector,
  memo(() => {
    const onClose = useActionWithBind(bonusEventDataModalClosedAction, "playerBonusCanceledEvent");

    const goToHistory = useLocalizedPushPath(routeMap.historyBonusesRoute);

    const onOk = useCallback(
      () => {
        goToHistory();
        onClose();
      },
      [onClose],
    );

    return <BonusCanceledPrompt onOk={onOk} onCancel={onClose} />;
  }),
);

export { createBonusCanceledModal };
