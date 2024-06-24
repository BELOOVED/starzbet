import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_statistics_button_showLess,
  sportsbookui_starzbet_statistics_button_showMore,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { type TVoidFn } from "@sb/utils";
import classes from "./ShowMore.module.css";
import { CollapseIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/CollapseIcon/CollapseIcon";

interface IShowMoreProps {
  less: boolean;
  onClick: TVoidFn;
}

const ShowMore = memo<IShowMoreProps>(({ less, onClick }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.showMore} onClick={onClick}>
      <CollapseIcon expanded={less} />

      <div className={classes.showMoreText}>
        {
          less
            ? t(sportsbookui_starzbet_statistics_button_showLess)
            : t(sportsbookui_starzbet_statistics_button_showMore)
        }
      </div>

      <CollapseIcon expanded={less} />
    </div>
  );
});
ShowMore.displayName = "ShowMore";

export { ShowMore };
