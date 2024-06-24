import { memo } from "react";
import type { TPlatform_PaparaAccountDetails_Fragment } from "@sb/graphql-client/PlayerUI";
import classes from "../PaymentAccount.module.css";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";

const PaymentPaparaAccount = memo<TPlatform_PaparaAccountDetails_Fragment>(({
  accountNumber,
}) => (
  <div className={classes.accountSubTitle}>
    <Ellipsis>
      {accountNumber}
    </Ellipsis>
  </div>
));
PaymentPaparaAccount.displayName = "PaymentPaparaAccount";

export { PaymentPaparaAccount };
