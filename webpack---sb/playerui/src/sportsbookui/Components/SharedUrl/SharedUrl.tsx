// @ts-nocheck
import { useSelector } from "react-redux";
import { betSlipPicksSelector } from "../../Store/BetSlip/Selectors/BetSlipPicksSelectors";
import { appPathNamespaceSelector } from "../../Store/App/Selectors/AppSelectors";
import { baseRouteMap } from "../../RouteMap/RouteMap";
import { encodePicks } from "../../Store/BetSlip/Model/EncodePicks";

const toString = (picks) => encodePicks(picks.map(({ outcomeId }) => outcomeId));

const SharedUrl = ({ children }) => {
  const picks = useSelector(betSlipPicksSelector);

  const pathNamespace = useSelector(appPathNamespaceSelector);

  return (
    children(`${window.location.origin}${pathNamespace}${baseRouteMap.share}?picks=${toString(picks)}`)
  );
};
SharedUrl.displayName = "SharedUrl";

export { SharedUrl };
