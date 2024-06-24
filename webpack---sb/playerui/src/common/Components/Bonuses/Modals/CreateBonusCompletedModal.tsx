import { type ComponentType, memo, useCallback } from "react";
import { useActionWithBind, withCondition } from "@sb/utils";
import { isBonusCompletedEventReceivedSelector } from "../../../../platformui/Store/Bonuses/Selectors/BonusesSelectors";
import { bonusEventDataModalClosedAction } from "../../../../platformui/Store/Bonuses/BonusesActions";
import { routeMap } from "../../../../platformui/RouteMap/RouteMap";
import type { TModalPromptActionProps } from "../../../Store/Modal/Model/TModalPromptActionProps";
import { useLocalizedPushPath } from "../../../Client/Core/Services/RouterService/Hooks/UseLocalizedPush";

// do not use it on Baywin, another logic cause GamePage in main App
const createBonusCompletedModal = (
  BonusCompletedPrompt: ComponentType<TModalPromptActionProps>,
) => withCondition(
  isBonusCompletedEventReceivedSelector,
  memo(() => {
    const onClose = useActionWithBind(bonusEventDataModalClosedAction, "playerBonusCompletedEvent");
    const goToHistory = useLocalizedPushPath(routeMap.historyBonusesRoute);

    const onOk = useCallback(
      () => {
        goToHistory();
        onClose();
      },
      [onClose],
    );

    return <BonusCompletedPrompt onOk={onOk} onCancel={onClose} />;
  }),
);

export { createBonusCompletedModal };
