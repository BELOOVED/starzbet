import { memo } from "react";
import classes from "./CloseButton.module.css";
import { Icon } from "../../../../../../../../../../common/Components/Icon/Icon";
import { useBetSlipRemovePickAction } from "../../../../../../../../../Store/BetSlip/Hooks/UseBetSlipRemovePickAction";
import { type TWithOutcomeId } from "../../TBetConstructorContent";

const CloseSvg = memo(() => (
  <svg
    width={"12"}
    height={"12"}
    viewBox={"0 0 12 12"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M11.8347 11.46C11.6149 11.6798 11.2592 11.6798 11.0391 11.46L6.37496 6.79474L1.70973 11.46C1.4899 11.6798 1.13422 11.6798 0.914142 11.46C0.69431 11.2401 0.69431 10.8845 0.914142 10.6644L5.58043 6.00021L0.914845 1.33497C0.695013 1.11514 0.695013 0.759464 0.914845 0.539386C1.13468 0.319554 1.49035 0.319554 1.71043 0.539386L6.37496 5.20567L11.0402 0.54044C11.26 0.320608 11.6157 0.320608 11.8358 0.54044C12.0556 0.760272 12.0556 1.11595 11.8358 1.33603L7.16949 6.00021L11.8347 10.6654C12.0562 10.8834 12.0562 11.242 11.8347 11.46Z"}
      fill={"currentColor"}
    />
  </svg>
));
CloseSvg.displayName = "CloseSvg";

const CloseButton = memo<TWithOutcomeId>(({ outcomeId }) => {
  const removeHandle = useBetSlipRemovePickAction(outcomeId);

  return (
    <Icon
      svgComponent={CloseSvg}
      className={classes.closeButton}
      onClick={removeHandle}
      width={12}
      height={12}
    />
  );
});
CloseButton.displayName = "CloseButton";

export { CloseButton };
