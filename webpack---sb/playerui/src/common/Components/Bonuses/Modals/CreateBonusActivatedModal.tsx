import { type ComponentType, memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAction, withCondition } from "@sb/utils";
import { useRouteMatch } from "@sb/react-router-compat";
import { routeMap } from "../../../../platformui/RouteMap/RouteMap";
import {
  bonusActivatedEventNotNilSelector,
  isBonusActivatedEventReceivedSelector,
} from "../../../../platformui/Store/Bonuses/Selectors/BonusesSelectors";
import { bonusEventDataModalClosedAction } from "../../../../platformui/Store/Bonuses/BonusesActions";
import type { TModalPromptActionProps } from "../../../Store/Modal/Model/TModalPromptActionProps";
import { useLocalizedPush } from "../../../Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { IS_MOBILE_CLIENT_SIDE } from "../../../Store/DeviceInfo/DeviceInfoConstant";

// do not use it on Baywin, another logic cause GamePage in main App
const createBonusActivatedModal = (
  BonusActivatedPrompt: ComponentType<TModalPromptActionProps>,
) => withCondition(
  isBonusActivatedEventReceivedSelector,
  memo(() => {
    const event = useSelector(bonusActivatedEventNotNilSelector);

    const isMyBonusesRoute = useRouteMatch({ path: routeMap.myBonusesRoute, exact: false });

    const removeDataWithReload = useAction(bonusEventDataModalClosedAction);
    const push = useLocalizedPush();

    const onOk = useCallback(
      () => {
        if (!IS_MOBILE_CLIENT_SIDE) {
          push(routeMap.myBonusRoute, { id: event.playerBonusId });
          removeDataWithReload("playerBonusActivatedEvent");

          return;
        }

        if (isMyBonusesRoute) {
          removeDataWithReload("playerBonusActivatedEvent");

          return;
        }

        push(routeMap.myBonusesRoute);
        removeDataWithReload("playerBonusActivatedEvent", true);
      },
      [event, isMyBonusesRoute],
    );

    const onCancel = useCallback(
      () => {
        if (isMyBonusesRoute) {
          removeDataWithReload("playerBonusActivatedEvent");

          return;
        }

        removeDataWithReload("playerBonusActivatedEvent", true);
      },
      [isMyBonusesRoute],
    );

    return <BonusActivatedPrompt onOk={onOk} onCancel={onCancel} />;
  }),
);

export { createBonusActivatedModal };
