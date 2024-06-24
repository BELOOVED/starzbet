import { type ComponentType, memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAction, withCondition } from "@sb/utils";
import { useRouteMatch } from "@sb/react-router-compat";
import {
  bonusClaimedEventNotNilSelector,
  isBonusClaimedEventReceivedSelector,
} from "../../../../platformui/Store/Bonuses/Selectors/BonusesSelectors";
import { routeMap } from "../../../../platformui/RouteMap/RouteMap";
import { bonusEventDataModalClosedAction } from "../../../../platformui/Store/Bonuses/BonusesActions";
import { useLocalizedPush } from "../../../Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { type TModalPromptActionProps } from "../../../Store/Modal/Model/TModalPromptActionProps";
import { isMobileSelector } from "../../../Store/DeviceInfo/DeviceInfoSelectors";

const createBonusClaimedModal = (
  BonusClaimedPrompt: ComponentType<TModalPromptActionProps>,
) => withCondition(
  isBonusClaimedEventReceivedSelector,
  memo(() => {
    const event = useSelector(bonusClaimedEventNotNilSelector);
    const isMobile = useSelector(isMobileSelector);

    const isMyBonusesRoute = useRouteMatch({ path: routeMap.myBonusesRoute, exact: false });

    const removeDataWithReload = useAction(bonusEventDataModalClosedAction);
    const push = useLocalizedPush();

    const onOk = useCallback(
      () => {
        if (!isMobile) {
          push(routeMap.myBonusRoute, { id: event.playerBonusId });
          removeDataWithReload("bonusClaimedEvent");

          return;
        }

        if (isMyBonusesRoute) {
          removeDataWithReload("bonusClaimedEvent");

          return;
        }

        push(routeMap.myBonusesRoute);
        removeDataWithReload("bonusClaimedEvent", true);
      },
      [event, isMyBonusesRoute],
    );

    const onCancel = useCallback(
      () => {
        if (isMyBonusesRoute) {
          removeDataWithReload("bonusClaimedEvent");

          return;
        }

        removeDataWithReload("bonusClaimedEvent", true);
      },
      [isMyBonusesRoute],
    );

    return <BonusClaimedPrompt onOk={onOk} onCancel={onCancel} />;
  }),
);

export { createBonusClaimedModal };
