import { useEffect } from "react";
import { useAction } from "@sb/utils";
import { vipClubLoadBonusesAndDependentDataAction } from "../VipClubActions";
import { vipClubGetMSUntilEndOfDay } from "../Util/VipClubTimeUtils";

const useVipClubRefetchBonuses = () => {
  const loadBonuses = useAction(vipClubLoadBonusesAndDependentDataAction);

  useEffect(
    () => {
      const timeout = setTimeout(loadBonuses, vipClubGetMSUntilEndOfDay());

      return () => clearTimeout(timeout);
    },
    [],
  );
};

export { useVipClubRefetchBonuses };
