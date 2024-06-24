import { memo, type ReactNode } from "react";
import { numberToComma } from "@sb/utils";

interface IVipClubProgressTextProps extends IWithClassName {
  currentAmount: number;
  maxAmount: number;
  postfix: ReactNode;
}

const VipClubProgressText = memo<IVipClubProgressTextProps>(({
  currentAmount,
  maxAmount,
  postfix,
  className,
}) => (
  <span className={className}>
    {numberToComma(currentAmount, 2)}
    &nbsp;
    {postfix}
    &nbsp;
    {"/"}

    {" "}

    {numberToComma(maxAmount, 2)}
    &nbsp;
    {postfix}
  </span>
));
VipClubProgressText.displayName = "VipClubProgressText";

export { VipClubProgressText };
