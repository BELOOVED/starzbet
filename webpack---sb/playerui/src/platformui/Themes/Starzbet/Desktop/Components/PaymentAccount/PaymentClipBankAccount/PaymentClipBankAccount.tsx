import { memo } from "react";
import type { TPlatform_PaymentClipBankAccountDetails_Fragment } from "@sb/graphql-client/PlayerUI";
import classes from "../PaymentAccount.module.css";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";

const PaymentClipBankAccount = memo<Omit<TPlatform_PaymentClipBankAccountDetails_Fragment, "__typename">>(({
  name,
  number,
  bankIfsc,
}) => (
  <>
    <div className={classes.accountSubTitle}>
      <Ellipsis>
        {name}
      </Ellipsis>
    </div>

    <div className={classes.accountSubTitle}>
      <Ellipsis>
        {number}
      </Ellipsis>
    </div>

    <div className={classes.accountSubTitle}>
      <Ellipsis>
        {bankIfsc}
      </Ellipsis>
    </div>
  </>
));
PaymentClipBankAccount.displayName = "PaymentClipBankAccount";

export { PaymentClipBankAccount };
