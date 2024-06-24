import { type ComponentType, createElement, memo } from "react";
import { isNotNil } from "@sb/utils";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import classes from "./PaymentAccount.module.css";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { type TPaymentAccountType } from "../../../../../Store/PaymentAccount/Selectors/PaymentAccountSelectors";
import { getPaymentAccountCryptoDetails } from "../../../../../Store/PaymentAccount/Utils/GetPaymentAccountCryptoDetails";
import { PaymentBankAccount } from "./PaymentBankAccount/PaymentBankAccount";
import { PaymentBankCard } from "./PaymentBankCard/PaymentBankCard";
import { PaymentPaparaAccount } from "./PaymentPaparaAccount/PaymentPaparaAccount";
import { PaymentCryptoWallet } from "./PaymentCryptoWallet/PaymentCryptoWallet";
import { PaymentClipBankAccount } from "./PaymentClipBankAccount/PaymentClipBankAccount";

interface IPaymentAccountContentProps extends Omit<TPaymentAccountType, "nickname"> {
  short: boolean;
}

const PaymentAccountContent = memo<IPaymentAccountContentProps>(({ details, short }) => {
  switch (details.__typename) {
    case "Platform_BankAccountDetails":
      return (
        <PaymentBankAccount {...details} short={short} />
      );

    case "Platform_PaymentClipBankAccountDetails":
      return (
        <PaymentClipBankAccount {...details} />
      );

    case "Platform_BankCardDetails":
      return (
        <PaymentBankCard {...details} />
      );

    case "Platform_PaparaAccountDetails":
      return (
        <PaymentPaparaAccount {...details} />
      );

    case (getPaymentAccountCryptoDetails(details.__typename)):
      return (
        <PaymentCryptoWallet {...details} />
      );

    default:
      return null;
  }
});
PaymentAccountContent.displayName = "PaymentAccountContent";

interface IPaymentAccountHeaderProps extends TPaymentAccountType {
  extraContent?: ComponentType;
  short?: boolean;
}

const PaymentAccountCard = memo<IPaymentAccountHeaderProps>(({
  extraContent,
  nickname,
  short = false,
  ...account
}) => (
  <>
    <div className={classes.accountTitle} {...qaAttr(PlayerUIQaAttributes.PaymentAccountsPage.Card_PaymentAccountName)}>
      {isNotNil(nickname) ? <Ellipsis>{nickname}</Ellipsis> : "-"}

      {isNotNil(extraContent) ? createElement(extraContent) : null}
    </div>

    <PaymentAccountContent {...account} short={short} />
  </>
));
PaymentAccountCard.displayName = "PaymentAccountCard";

export { PaymentAccountCard };
