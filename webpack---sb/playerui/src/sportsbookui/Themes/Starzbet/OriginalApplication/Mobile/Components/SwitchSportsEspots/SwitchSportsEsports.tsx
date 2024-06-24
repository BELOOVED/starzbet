import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_mainNavigationLinks_link_eSports,
  platformui_starzbet_mainNavigationLinks_link_sports,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./SwitchSportsEsports.module.css";
import { SportsIcon } from "../../../../../../../platformui/Themes/Starzbet/Components/Icons/SportsIcon/SportsIcon";
import { ESportsIcon } from "../../../../../../../platformui/Themes/Starzbet/Components/Icons/ESportsIcon/ESportsIcon";
import { LinkLocalized } from "../../../../../../../common/Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";
import { type TLocalizedRoutePath } from "../../../../../../../common/Client/Core/Services/RouterService/Model/LocalizedRoute";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";

interface ISwitchSportsESportsProps {
  isESports: boolean;
  switchTo: TLocalizedRoutePath<string>;
}

const SwitchSportsESports = memo<ISwitchSportsESportsProps>((
  { isESports, switchTo },
) => {
  const [t] = useTranslation();

  return (
    <LinkLocalized className={classes.switch} to={switchTo}>
      <button className={!isESports ? classes.active : undefined}>
        <SportsIcon />

        <Ellipsis>
          {t(platformui_starzbet_mainNavigationLinks_link_sports)}
        </Ellipsis>
      </button>

      <button className={isESports ? classes.active : undefined}>
        <ESportsIcon />

        <Ellipsis>
          {t(platformui_starzbet_mainNavigationLinks_link_eSports)}
        </Ellipsis>
      </button>
    </LinkLocalized>
  );
});
SwitchSportsESports.displayName = "SwitchSportsESports";

export {
  SwitchSportsESports,
};
