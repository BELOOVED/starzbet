import { memo } from "react";
import { type TIconProps } from "../../../../../../common/Components/Icon/Icon";
import { EyeShowIcon } from "./EyeShowIcon";
import { EyeHideIcon } from "./EyeHideIcon";

interface IEyeIconProps extends TIconProps {
  open: boolean;
}

const EyeIcon = memo<IEyeIconProps>(
  ({ open, ...props }) =>
    open
      ? <EyeShowIcon {...props} />
      : <EyeHideIcon {...props} />,
);
EyeIcon.displayName = "EyeIcon";

export { EyeIcon };
