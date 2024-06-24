// @ts-nocheck
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { sportsbookui_betSlip_message_maximumCountSelectionsAlreadyMade } from "@sb/translates/sportsbookui/CommonTKeys";
import { picksAreExceededSelector } from "../../Store/BetSlip/Selectors/BetSlipSelectors";
import { maxPicks } from "../../Store/BetSlip/Constants/MaxPicks";

const PicksAreExceeded = ({ children }) => {
  const [t] = useTranslation();

  const exceeded = useSelector(picksAreExceededSelector);

  if (!exceeded) {
    return null;
  }

  return (
    children(t(sportsbookui_betSlip_message_maximumCountSelectionsAlreadyMade, { count: maxPicks }))
  );
};
PicksAreExceeded.displayName = "PicksAreExceeded";

export { PicksAreExceeded };
