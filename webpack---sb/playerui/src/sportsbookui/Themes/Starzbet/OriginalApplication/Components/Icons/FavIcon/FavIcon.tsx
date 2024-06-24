import { memo } from "react";
import { FilledBonusIcon } from "../../../../../../../platformui/Themes/Starzbet/Components/Icons/BonusIcon/BonusIcon";
import { type TIconProps } from "../../../../../../../common/Components/Icon/Icon";

interface IFavIconProps extends TIconProps {
  active: boolean;
}

const FavIcon = memo<IFavIconProps>(
  ({ active, ...props }) =>
    <FilledBonusIcon color={active ? "active" : "white"} {...props} />,
);
FavIcon.displayName = "FavIcon";

export { FavIcon };
