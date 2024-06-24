import clsx from "clsx";
import { memo, type ReactNode } from "react";
import { useTranslation } from "@sb/translator";
import classes from "./DepositForm.module.css";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";
import { Copy } from "../Copy/Copy";

interface IDepositFormBaseItem {
  title: string;
  value: ReactNode;
  withCopy?: false;
}

interface IDepositFormWithCopyItem {
  title: string;
  value: string;
  withCopy?: true;
}

type TDepositFormItemProps = IDepositFormBaseItem | IDepositFormWithCopyItem

const DepositFormItem = memo<TDepositFormItemProps>(({ title, value, withCopy }) => {
  const [t] = useTranslation();

  return (
    <div className={clsx(classes.formItem, classes.paddingBottom)}>
      <div className={classes.formItemTitle}>
        {t(title)}
      </div>

      <div className={classes.formItemContent}>
        <Ellipsis>
          {value}
        </Ellipsis>

        {withCopy && <Copy text={value} />}
      </div>
    </div>
  );
});
DepositFormItem.displayName = "DepositFormItem";

export { DepositFormItem };
