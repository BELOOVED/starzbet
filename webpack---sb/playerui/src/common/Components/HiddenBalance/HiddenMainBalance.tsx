import clsx from "clsx";
import { type DetailedHTMLProps, type HTMLAttributes, memo } from "react";
import { useSelector } from "react-redux";
import { type IMoney, withProps } from "@sb/utils";
import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";
import classes from "./HiddenBalance.module.css";
import { sumBalanceOrNullSelector } from "../../../platformui/Store/Player/SumBalanceSelector";
import { bonusBalanceOrNullSelector, freebetBalanceOrNullSelector } from "../../../platformui/Store/Bonuses/Selectors/BonusesSelectors";
import { type TPlatformAppState } from "../../../platformui/Store/PlatformInitialState";
import { Ellipsis } from "../../../platformui/Components/Ellipsis/Ellipsis";
import { hiddenBalanceSelector } from "../../Store/Player/Selectors/PlayerSelectors";
import { mainBalanceOrNullSelector } from "../../Store/Player/Selectors/MainBalanceOrNullSelector";
import { getBalanceText } from "../../Utils/ComponentsUtils/GetBalanceText";

interface IBaseBalanceProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, IWithQaAttribute {
  balanceSelector: (state: TPlatformAppState) => (IMoney | null | undefined);
  className?: string;
  allowZero?: boolean;
  withEllipsis?: boolean;
}

const BaseBalance = memo<IBaseBalanceProps>(({
  balanceSelector,
  className = "",
  allowZero = false,
  qaAttribute,
  withEllipsis,
  ...rest
}) => {
  const balance = useSelector(balanceSelector);

  const playerBalance = useSelector(mainBalanceOrNullSelector);

  const hidden = useSelector(hiddenBalanceSelector);
  const text = getBalanceText(balance, playerBalance, allowZero);

  return (
    <div className={clsx(className, classes.balance, hidden && classes.hidden)} {...rest}>
      {
        withEllipsis
          ?  <Ellipsis {...qaAttr(qaAttribute)}>{text}</Ellipsis>
          : (
            <span {...qaAttr(qaAttribute)}>{text}</span>
          )
      }

      <span>
        {"••••"}
      </span>
    </div>
  );
});
BaseBalance.displayName = "BaseBalance";

const HiddenMainBalance = withProps(BaseBalance)({
  balanceSelector: mainBalanceOrNullSelector,
});

const HiddenBalance = withProps(BaseBalance)({
  balanceSelector: sumBalanceOrNullSelector,
});

const BonusHiddenBalance = withProps(BaseBalance)({
  balanceSelector: bonusBalanceOrNullSelector,
});

const FreebetHiddenBalance = withProps(BaseBalance)({
  balanceSelector: freebetBalanceOrNullSelector,
});

export {
  HiddenMainBalance,
  BonusHiddenBalance,
  FreebetHiddenBalance,
  HiddenBalance,
};
