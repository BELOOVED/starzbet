import { type ComponentType, memo, useCallback } from "react";
import { useActionWithBind, withCondition } from "@sb/utils";
import { isBonusLostEventReceivedSelector } from "../../../../platformui/Store/Bonuses/Selectors/BonusesSelectors";
import { bonusEventDataModalClosedAction } from "../../../../platformui/Store/Bonuses/BonusesActions";
import { routeMap } from "../../../../platformui/RouteMap/RouteMap";
import type { TModalPromptActionProps } from "../../../Store/Modal/Model/TModalPromptActionProps";
import { useLocalizedPushPath } from "../../../Client/Core/Services/RouterService/Hooks/UseLocalizedPush";

// do not use it on Baywin, another logic cause GamePage in main App
const createBonusLostModal = (
  BonusLostPrompt: ComponentType<TModalPromptActionProps>,
) => withCondition(
  isBonusLostEventReceivedSelector,
  memo(() => {
    const onClose = useActionWithBind(bonusEventDataModalClosedAction, "playerBonusLostEvent");
    const goToHistory = useLocalizedPushPath(routeMap.historyBonusesRoute);

    const onOk = useCallback(
      () => {
        goToHistory();
        onClose();
      },
      [onClose],
    );

    return <BonusLostPrompt onOk={onOk} onCancel={onClose} />;
  }),
);

export { createBonusLostModal };
