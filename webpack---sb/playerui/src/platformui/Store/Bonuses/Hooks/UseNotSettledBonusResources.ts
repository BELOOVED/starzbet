import { useEffect } from "react";
import { useActionWithBind } from "@sb/utils";
import {
  unsettledBonusResourcesCountMountedAction,
  unsettledBonusResourcesCountUnmountedAction,
} from "../BonusesActions";

const useNotSettledBonusResources = (playerBonusId: string) => {
  const onMount = useActionWithBind(unsettledBonusResourcesCountMountedAction, playerBonusId);
  const onUnmount = useActionWithBind(unsettledBonusResourcesCountUnmountedAction, playerBonusId);

  useEffect(
    () => {
      onMount();

      return onUnmount;
    },
    [],
  );
};

export { useNotSettledBonusResources };
