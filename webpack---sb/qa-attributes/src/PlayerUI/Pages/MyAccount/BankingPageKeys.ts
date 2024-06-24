import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__banking");

class BankingPageKeys {
  static DepositTab = withAttr("depositTab");
  static WithdrawTab = withAttr("withdrawTab");
  static PendingButton = withAttr("pendingButton");
  static MethodIcon = withAttr("methodIcon");
  static MethodMin = withAttr("methodMin");
  static MethodMax = withAttr("methodMax");
  static MethodHeading = withAttr("methodHeading");
  static IdFIeld = withAttr("idField");
  static DepositButton = withAttr("depositButton");
  static WithdrawButton = withAttr("witdrawButton");
  static AmountField = withAttr("amountField");
  static HistoryCard = withAttr("historyCard");
  static TransactionTime = withAttr("transactionTime");
  static FirstName = withAttr("firstName");
  static LastName = withAttr("lastName");
}

export { BankingPageKeys };
