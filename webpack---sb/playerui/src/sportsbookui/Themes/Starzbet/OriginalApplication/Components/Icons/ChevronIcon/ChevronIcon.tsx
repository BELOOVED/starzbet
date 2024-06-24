import { memo } from "react";
import { type TIconProps } from "../../../../../../../common/Components/Icon/Icon";
import { ChevronUpIcon } from "./ChevronUpIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";

interface IChevronIconProps extends TIconProps {
  expanded: boolean;
}

const ChevronIcon = memo<IChevronIconProps>(
  ({ expanded, ...props }) =>
    expanded
      ? <ChevronUpIcon {...props} />
      : <ChevronDownIcon {...props} />,
);
ChevronIcon.displayName = "ChevronIcon";

export { ChevronIcon };
