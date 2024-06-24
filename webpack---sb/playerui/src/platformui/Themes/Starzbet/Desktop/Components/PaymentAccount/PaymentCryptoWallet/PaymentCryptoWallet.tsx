import { memo } from "react";
import classes from "../PaymentAccount.module.css";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { type TPaymentAccountCryptoDetails } from "../../../../../../Store/PaymentAccount/Models/TPaymentAccountCryptoDetails";

const PaymentCryptoWallet = memo<TPaymentAccountCryptoDetails>(({
  walletAddress,
}) => (
  <div className={classes.accountSubTitle}>
    <Ellipsis>
      {walletAddress}
    </Ellipsis>
  </div>
));
PaymentCryptoWallet.displayName = "PaymentCryptoWallet";

export { PaymentCryptoWallet };
