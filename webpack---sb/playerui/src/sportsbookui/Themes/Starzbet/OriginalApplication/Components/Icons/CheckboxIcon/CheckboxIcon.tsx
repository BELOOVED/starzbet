import { memo } from "react";
import { type TIconProps } from "../../../../../../../common/Components/Icon/Icon";
import { CheckboxCheckedIcon } from "./CheckboxCheckedIcon";
import { CheckboxEmptyIcon } from "./CheckboxEmptyIcon";

interface ICheckboxIconProps extends TIconProps {
  checked: boolean;
}

const CheckboxIcon = memo<ICheckboxIconProps>(
  ({ checked, ...props }) =>
    checked
      ? <CheckboxCheckedIcon color={"brand"} size={"m"} {...props} />
      : <CheckboxEmptyIcon color={"text"} size={"m"} {...props} />,
);
CheckboxIcon.displayName = "CheckboxIcon";

export { CheckboxIcon };
