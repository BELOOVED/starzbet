import clsx from "clsx";
import { memo } from "react";
import { useTranslation, type TFuncWithPlain } from "@sb/translator";
import { EMoneyFormat, type IMoney, Money } from "@sb/utils";
import classes from "./BetConstructorTextBlock.module.css";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";

type TTextBlockProps = {
  title: Readonly<Parameters<TFuncWithPlain>>;
  subtitle: Readonly<Parameters<TFuncWithPlain>>;
}

const BetConstructorTextBlock = memo<TTextBlockProps>(
  ({ title, subtitle }) => {
    const [t] = useTranslation();

    return (
      <div className={clsx(classes.textBlock)}>
        <Ellipsis className={classes.title}>
          {t(...title)}
        </Ellipsis>

        <Ellipsis className={classes.subtitle}>
          {t(...subtitle)}
        </Ellipsis>
      </div>
    );
  },
);
BetConstructorTextBlock.displayName = "BetConstructorTextBlock";

type TMoneyTextBlockProps = {
  money: IMoney;
  title: string;
}
const MoneyTextBlock = memo<TMoneyTextBlockProps>(
  ({ title, money }) => {
    const props = {
      title: [title] as const,
      subtitle: [Money.toFormat(money, EMoneyFormat.symbolLeft)] as const,
    };

    return <BetConstructorTextBlock {...props} />;
  },
);
MoneyTextBlock.displayName = "MoneyTextBlock";

export { BetConstructorTextBlock, MoneyTextBlock };
