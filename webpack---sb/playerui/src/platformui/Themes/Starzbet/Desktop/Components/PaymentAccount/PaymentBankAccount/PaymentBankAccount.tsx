import { memo } from "react";
import type { TPlatform_BankAccountDetails_Fragment } from "@sb/graphql-client/PlayerUI";
import classes from "../PaymentAccount.module.css";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";

interface IPaymentBankAccountProps extends Omit<TPlatform_BankAccountDetails_Fragment, "__typename"> {
  short: boolean;
}

const PaymentBankAccount = memo<IPaymentBankAccountProps>(({
  bankName,
  iban,
  paymentMethodInfo,
  short,
}) => (
  <>
    <div className={classes.accountSubTitle}>
      <Ellipsis>
        {bankName}
      </Ellipsis>
    </div>

    <div className={classes.accountSubTitle}>
      <Ellipsis>
        {iban}
      </Ellipsis>
    </div>

    {
      !short
        ? (
          <div className={classes.accountSubTitle}>
            <Ellipsis>
              {
                paymentMethodInfo.map((info, idx) => (
                  <span
                    key={info.paymentMethod?.id}
                  >
                    {info.paymentMethod?.name}

                    {idx !== paymentMethodInfo.length - 1 ? ", " : null}
                  </span>
                ))
              }
            </Ellipsis>
          </div>
        )
        : null
    }
  </>
));
PaymentBankAccount.displayName = "PaymentBankAccount";

export { PaymentBankAccount };
