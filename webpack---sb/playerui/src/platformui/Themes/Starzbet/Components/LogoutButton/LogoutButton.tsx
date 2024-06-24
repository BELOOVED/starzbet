import clsx from "clsx";
import { memo, type MouseEventHandler } from "react";
import { platformui_starzbet_navLink_logout } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { useAction } from "@sb/utils";
import { requestLogoutAction } from "@sb/auth";
import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";
import classes from "./LogoutButton.module.css";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";
import { OffIcon } from "../Icons/OffIcon/OffIcon";

interface ILogoutButtonProps extends IWithQaAttribute {
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
  icon?: boolean;
}

const LogoutButton = memo<ILogoutButtonProps>(({
  onClick,
  className,
  icon = false,
  qaAttribute,
}) => {
  const [t] = useTranslation();

  const logoutHandler = useAction(requestLogoutAction);

  return (
    <div
      onClick={onClick || logoutHandler}
      className={clsx(classes.logout, className)}
    >
      {
        icon && (
          <div>
            <OffIcon size={"s"} />
          </div>
        )
      }

      <Ellipsis className={classes.name} {...qaAttr(qaAttribute)}>
        {t(platformui_starzbet_navLink_logout)}
      </Ellipsis>
    </div>
  );
});
LogoutButton.displayName = "LogoutButton";

export { LogoutButton };
