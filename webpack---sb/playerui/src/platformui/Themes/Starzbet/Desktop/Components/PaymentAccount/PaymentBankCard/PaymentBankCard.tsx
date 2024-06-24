import { memo } from "react";
import type { TPlatform_BankCardDetails_Fragment } from "@sb/graphql-client/PlayerUI";
import classes from "../PaymentAccount.module.css";
import { DateFormat } from "../../../../../../../common/Components/Date/DateFormat";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";

const PaymentBankCard = memo<TPlatform_BankCardDetails_Fragment>(({
  cardNumber,
  cardHolderName,
  expiryDate,
}) => (
  <>
    <div className={classes.accountSubTitle}>
      <Ellipsis>
        {cardNumber}
      </Ellipsis>
    </div>

    <div className={classes.accountSubTitle}>
      <Ellipsis>
        {cardHolderName}
      </Ellipsis>
    </div>

    <div className={classes.accountSubTitle}>
      <Ellipsis>
        <DateFormat date={+expiryDate} format={"MM/yyyy"} />
      </Ellipsis>
    </div>
  </>
));
PaymentBankCard.displayName = "PaymentBankCard";

export { PaymentBankCard };
