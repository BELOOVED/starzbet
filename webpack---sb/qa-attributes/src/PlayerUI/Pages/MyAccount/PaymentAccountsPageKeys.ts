import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("payment_accounts_page");

class PaymentAccountsPageKeys {
  static Card_Container = withAttr("card", "container");
  static Card_Iban = withAttr("card", "iban");
  static Card_BankName = withAttr("card", "bank_name");
  static Card_PaymentAccountName = withAttr("card", "payment_account_name");
  static AddCardButton = withAttr("button", "add_card");
  static DeleteCardButton = withAttr("button", "remove_card");
  static IbanInput = withAttr("input", "iban");
  static CreateButton = withAttr("button", "create");
  static BankNameOption = withAttr("option", "bank_name");
  static BankNameSelect = withAttr("select", "bank_name");
  static AccountTypeOption = withAttr("option", "account_type");
  static AccountTypeSelect = withAttr("select", "account_type");
  static PaymentAccountNameInput = withAttr("input", "payment_account_name");
}

export { PaymentAccountsPageKeys };
