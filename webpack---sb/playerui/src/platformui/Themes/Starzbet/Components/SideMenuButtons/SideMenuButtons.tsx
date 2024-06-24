// @ts-nocheck
import clsx from "clsx";
import { memo } from "react";
import { type LinkProps } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_menu_button_deposit,
  platformui_starzbet_menu_button_withdraw,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { qaAttr } from "@sb/qa-attributes";
import { preventDefault } from "@sb/utils";
import classes from "./SideMenuButtons.module.css";
import { playerNotVerifiedSelector } from "../../../../../common/Store/Player/Selectors/PlayerSelectors";
import { LinkLocalized } from "../../../../../common/Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";
import { routeMap } from "../../../../RouteMap/RouteMap";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";

interface ISideMenuButtonsProps {
  onClick?: LinkProps["onClick"];
  withdrawButtonQaAttribute?: string;
  depositButtonQaAttribute?: string;
}

const SideMenuButtons = memo<ISideMenuButtonsProps>(({
  onClick,
  withdrawButtonQaAttribute,
  depositButtonQaAttribute,
}) => {
  const [t] = useTranslation();

  const notVerified = useSelector(playerNotVerifiedSelector);

  const clickHandler = notVerified ? preventDefault : onClick;

  return (
    <div className={classes.buttons}>
      <LinkLocalized
        to={routeMap.depositRoute}
        className={clsx(classes.deposit, notVerified && classes.notVerified)}
        onClick={clickHandler}
        {...qaAttr(depositButtonQaAttribute)}
      >
        <Ellipsis>
          {t(platformui_starzbet_menu_button_deposit)}
        </Ellipsis>
      </LinkLocalized>

      <LinkLocalized
        to={routeMap.withdrawRoute}
        className={clsx(classes.withdraw, notVerified && classes.notVerified)}
        onClick={clickHandler}
        {...qaAttr(withdrawButtonQaAttribute)}
      >
        <Ellipsis>
          {t(platformui_starzbet_menu_button_withdraw)}
        </Ellipsis>
      </LinkLocalized>
    </div>
  );
});
SideMenuButtons.displayName = "SideMenuButtons";

export { SideMenuButtons };
