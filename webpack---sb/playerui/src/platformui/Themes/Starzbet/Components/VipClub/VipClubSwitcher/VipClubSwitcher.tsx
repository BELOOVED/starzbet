import { type ComponentType, createElement, memo } from "react";
import {
  platformui_starzbet_vipClub_switcher_leaders,
  platformui_starzbet_vipClub_switcher_overview,
  platformui_starzbet_vipClub_switcher_tournaments,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { withProps } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import classes from "./VipClubSwitcher.module.css";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import type { TVipClubLinkProps } from "../../../../../Components/VipClub/VipClubLinks/TVipClubLinkProps";
import {
  VipClubLeadersLink,
  VipClubOverviewLink,
  VipClubTournamentsLink,
} from "../../../../../Components/VipClub/VipClubLinks/VipClubPagesLinks";
import { TrophyIcon } from "../../Icons/TrophyIcon/TrophyIcon";
import { CrownIconV1 } from "../../Icons/CrownIcon/CrownIcon";
import { FireIcon } from "../../Icons/FireIcon";

interface IVipClubSwitcherBaseProps {
  links: {
    Component: ComponentType<TVipClubLinkProps>;
    titleTKey: string;
    icon: ComponentType;
  }[];
}

const VipClubSwitcherBase = memo<IVipClubSwitcherBaseProps>(({ links }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.vipClubSwitcher}>
      {
        links.map(({ titleTKey, Component, icon }) => (
          <Component className={classes.vipClubSwitcherTab} key={titleTKey}>
            <div className={classes.vipClubSwitcherContent}>
              {createElement(icon)}

              <Ellipsis className={classes.vipClubSwitcherText}>
                {t(titleTKey)}
              </Ellipsis>
            </div>
          </Component>
        ))
      }
    </div>
  );
});
VipClubSwitcherBase.displayName = "VipClubSwitcherBase";

const VIP_CLUB_LINKS = [
  {
    Component: VipClubOverviewLink,
    titleTKey: platformui_starzbet_vipClub_switcher_overview,
    icon: withProps(CrownIconV1)({ width: 18, height: 18 }),
  },
  {
    Component: VipClubLeadersLink,
    titleTKey: platformui_starzbet_vipClub_switcher_leaders,
    icon: withProps(TrophyIcon)({ width: 18, height: 18 }),
  },
  {
    Component: VipClubTournamentsLink,
    titleTKey: platformui_starzbet_vipClub_switcher_tournaments,
    icon: withProps(FireIcon)({ width: 18, height: 18 }),
  },
];

const VipClubSwitcher = withProps(VipClubSwitcherBase)({ links: VIP_CLUB_LINKS });

export { VipClubSwitcher };
