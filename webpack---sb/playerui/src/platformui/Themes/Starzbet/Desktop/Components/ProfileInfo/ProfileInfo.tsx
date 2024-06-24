// @ts-nocheck
/* eslint-disable rulesdir/jsx-element-max-length */
import clsx from "clsx";
import { createElement, memo, type ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_menu_title_bonusBalance,
  platformui_starzbet_menu_title_freeBetBalance,
  platformui_starzbet_menu_title_main_balance,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";
import { type TComponent, type TVoidFn, useAction } from "@sb/utils";
import classes from "./ProfileInfo.module.css";
import { When } from "../../../../../../common/Components/When";
import { hiddenBalanceSelector, playerDetailsSelectors } from "../../../../../../common/Store/Player/Selectors/PlayerSelectors";
import { usePlayerRequestWalletAction } from "../../../../../../common/Store/Player/Hooks/UsePlayerRequestWalletAction";
import { toggleShowBalanceAction } from "../../../../../../common/Store/Player/PlayerActions";
import {
  BonusHiddenBalance,
  FreebetHiddenBalance,
  HiddenMainBalance,
} from "../../../../../../common/Components/HiddenBalance/HiddenMainBalance";
import { hasBonusBalanceSelector, hasFreebetBalanceSelector } from "../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { SideMenuButtons } from "../../../Components/SideMenuButtons/SideMenuButtons";

const UpdateBalance = memo<IWithQaAttribute>(({ qaAttribute }) => {
  const [rotate, setRotate] = useState(false);

  const handleRefresh = usePlayerRequestWalletAction();

  const onClick = () => {
    handleRefresh();

    setRotate(true);
  };

  const onAnimationEnd = () => setRotate(false);

  return (
    <div
      className={clsx(classes.updateBalance, rotate && classes.rotate)}
      onClick={onClick}
      onAnimationEnd={onAnimationEnd}
      {...qaAttr(qaAttribute)}
    />
  );
});
UpdateBalance.displayName = "UpdateBalance";

interface IWithProfileQaAttributes {
  usernameQaAttribute?: string;
  showHideQaAttribute?: string;
  updateQaAttribute?: string;
}

const ProfileName = memo<IWithProfileQaAttributes>(({
  usernameQaAttribute,
  updateQaAttribute,
  showHideQaAttribute,
}) => {
  const username = useSelector(playerDetailsSelectors.login);

  const hidden = useSelector(hiddenBalanceSelector);

  const toggleBalanceHidden = useAction(toggleShowBalanceAction);

  return (
    <div className={classes.profileContainer}>
      <div className={classes.avatar} />

      <div className={classes.username}>
        <Ellipsis {...qaAttr(usernameQaAttribute)}>
          {username}
        </Ellipsis>

        <div className={classes.control}>
          <UpdateBalance qaAttribute={updateQaAttribute} />

          <div
            className={clsx(classes.hideBalance, hidden && classes.showBalance)}
            onClick={toggleBalanceHidden}
            {...qaAttr(showHideQaAttribute)}
          />
        </div>
      </div>
    </div>
  );
});
ProfileName.displayName = "ProfileName";

interface IDetailProps extends IWithQaAttribute {
  component: ReactNode;
  title: ReactNode;
}

const Detail = memo<IDetailProps>(({ component, title, qaAttribute }) => (
  <div className={classes.block} {...qaAttr(qaAttribute)}>
    <Ellipsis className={classes.titleAmount}>
      {title}
    </Ellipsis>

    <Ellipsis className={classes.amount}>
      {component}
    </Ellipsis>
  </div>
));
Detail.displayName = "Detail";

interface IProfileInfoProps {
  closeHandler?: TVoidFn;
  cashbackButton?: TComponent;
  profileSectionQaAttribute?: string;
  usernameQaAttribute?: string;
  showHideBalanceButtonQaAttribute?: string;
  updateBalanceButtonQaAttribute?: string;
  mainBalanceValueQaAttribute?: string;
  depositButtonQaAttribute?: string;
  withdrawalButtonQaAttribute?: string;
}

const ProfileInfo = memo<IProfileInfoProps>(({
  closeHandler,
  cashbackButton,
  profileSectionQaAttribute,
  usernameQaAttribute,
  updateBalanceButtonQaAttribute,
  showHideBalanceButtonQaAttribute,
  mainBalanceValueQaAttribute,
  depositButtonQaAttribute,
  withdrawalButtonQaAttribute,
}) => {
  const [t] = useTranslation();
  const hasBonusBalance = useSelector(hasBonusBalanceSelector);
  const hasFreebetBalance = useSelector(hasFreebetBalanceSelector);

  return (
    <div className={classes.profile} {...qaAttr(profileSectionQaAttribute)}>
      <div className={classes.top}>
        <ProfileName
          usernameQaAttribute={usernameQaAttribute}
          showHideQaAttribute={showHideBalanceButtonQaAttribute}
          updateQaAttribute={updateBalanceButtonQaAttribute}
        />
      </div>

      <SideMenuButtons
        onClick={closeHandler}
        depositButtonQaAttribute={depositButtonQaAttribute}
        withdrawButtonQaAttribute={withdrawalButtonQaAttribute}
      />

      {cashbackButton ? createElement(cashbackButton) : null}

      <div className={classes.detail}>
        <Detail
          component={<HiddenMainBalance className={classes.hidden} qaAttribute={mainBalanceValueQaAttribute} />}
          title={t(platformui_starzbet_menu_title_main_balance)}
        />

        <When condition={hasBonusBalance}>
          <Detail
            component={<BonusHiddenBalance className={classes.hidden} />}
            title={t(platformui_starzbet_menu_title_bonusBalance)}
          />
        </When>

        <When condition={hasFreebetBalance}>
          <Detail
            component={<FreebetHiddenBalance className={classes.hidden} />}
            title={t(platformui_starzbet_menu_title_freeBetBalance)}
          />
        </When>
      </div>
    </div>
  );
});
ProfileInfo.displayName = "ProfileInfo";

export { ProfileInfo, UpdateBalance };
