import { memo } from "react";
import { type TIconProps } from "../../../../../../../common/Components/Icon/Icon";
import { DropdownUpIcon } from "./DropdownUpIcon";
import { DropdownDownIcon } from "./DropdownDownIcon";

interface IDropdownIconProps extends TIconProps {
  expanded: boolean;
}

const DropdownIcon = memo<IDropdownIconProps>(
  ({ expanded, ...props }) =>
    expanded
      ? <DropdownUpIcon {...props} />
      : <DropdownDownIcon {...props} />,
);
DropdownIcon.displayName = "DropdownIcon";

export { DropdownIcon };
