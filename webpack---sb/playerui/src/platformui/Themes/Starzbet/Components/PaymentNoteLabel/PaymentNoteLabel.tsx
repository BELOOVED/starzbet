import clsx from "clsx";
import { memo, type ReactNode } from "react";
import classes from "./PaymentNoteLabel.module.css";
import { WarningIcon } from "../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/WarningIcon/WarningIcon";
import { PaymentNoteModal } from "../PaymentNoteModal/PaymentNoteModal";

interface IPaymentNoteLabelProps extends IWithClassName {
  header: ReactNode;
  content?: string;
}

const PaymentNoteLabel = memo<IPaymentNoteLabelProps>(({ header, content, className }) => (
  <div className={clsx(classes.labelWrapper, className)}>
    <div className={classes.labelHeader}>
      <WarningIcon size={"m"} className={classes.labelIcon} />

      <span className={classes.labelTitle}>
        {header}
      </span>
    </div>

    {
      content
        ? (
          <>
            <div className={classes.labelContent}>
              {content}
            </div>

            <PaymentNoteModal message={content} />
          </>
        )
        : null
    }
  </div>
));
PaymentNoteLabel.displayName = "PaymentNoteLabel";

export { PaymentNoteLabel };
