import { memo } from "react";
import { useSelector } from "react-redux";
import { EMoneyFormat, type IMoney, Money } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_menu_title_bonusBalance,
  platformui_starzbet_menu_title_main_balance,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "../WithdrawForm.module.css";
import {
  bonusWalletSelectors,
  playerWalletSelectors,
} from "../../../../../../common/Store/Player/Selectors/WalletSelectors";

interface IAccountInfoCardProps {
  money: IMoney;
  title: string;
}

const AccountInfoCard = memo<IAccountInfoCardProps>(({ money, title }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.accountInfoCard}>
      <div className={classes.accountInfoMoney}>
        {Money.toFormat(money, EMoneyFormat.symbolLeft)}
      </div>

      <div className={classes.accountInfoTitle}>
        {t(title)}
      </div>
    </div>
  );
});
AccountInfoCard.displayName = "AccountInfoCard";

const AccountInfo = memo(() => {
  const balance = useSelector(playerWalletSelectors.balance);
  const bonusBalance = useSelector(bonusWalletSelectors.balance);

  return (
    <div className={classes.accountInfo}>
      <AccountInfoCard
        title={platformui_starzbet_menu_title_main_balance}
        money={balance}
      />

      <AccountInfoCard
        title={platformui_starzbet_menu_title_bonusBalance}
        money={bonusBalance}
      />
    </div>
  );
});
AccountInfo.displayName = "AccountInfo";

export { AccountInfo };
