import { memo } from "react";
import { numberToComma } from "@sb/utils";

interface IVipClubProgressPercentProps extends IWithClassName {
  percent: number;
}

const VipClubProgressPercent = memo<IVipClubProgressPercentProps>(({ percent, className }) => (
  <span className={className}>
    {numberToComma(percent, 1)}

    {"%"}
  </span>
));
VipClubProgressPercent.displayName = "VipClubProgressPercent";

export { VipClubProgressPercent };
