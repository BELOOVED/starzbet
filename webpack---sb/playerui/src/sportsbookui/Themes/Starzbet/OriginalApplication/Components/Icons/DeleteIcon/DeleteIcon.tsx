import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const DeleteIconSvg = memo(() => (
  <svg
    width={"14"}
    height={"16"}
    viewBox={"0 0 14 16"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_1002_103975)"}>
      <path
        d={"M12.2503 4H1.75033C1.40033 4 1.16699 4.22857 1.16699 4.57143V15.4286C1.16699 15.7714 1.40033 16 1.75033 16H12.2503C12.6003 16 12.8337 15.7714 12.8337 15.4286V4.57143C12.8337 4.22857 12.6003 4 12.2503 4ZM5.83366 12C5.83366 12.3429 5.60033 12.5714 5.25033 12.5714C4.90033 12.5714 4.66699 12.3429 4.66699 12V8C4.66699 7.65714 4.90033 7.42857 5.25033 7.42857C5.60033 7.42857 5.83366 7.65714 5.83366 8V12ZM9.33366 12C9.33366 12.3429 9.10033 12.5714 8.75033 12.5714C8.40033 12.5714 8.16699 12.3429 8.16699 12V8C8.16699 7.65714 8.40033 7.42857 8.75033 7.42857C9.10033 7.42857 9.33366 7.65714 9.33366 8V12Z"}
        fill={"currentColor"}
      />

      <path
        d={"M13.4167 1.71429H9.91667V0.571429C9.91667 0.228571 9.68333 0 9.33333 0H4.66667C4.31667 0 4.08333 0.228571 4.08333 0.571429V1.71429H0.583333C0.233333 1.71429 0 1.94286 0 2.28571C0 2.62857 0.233333 2.85714 0.583333 2.85714H13.4167C13.7667 2.85714 14 2.62857 14 2.28571C14 1.94286 13.7667 1.71429 13.4167 1.71429Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_1002_103975"}>
        <rect width={"14"} height={"16"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>
));
DeleteIconSvg.displayName = "DeleteIconSvg";

const DeleteIcon = withProps(Icon)({ svgComponent: DeleteIconSvg });

export { DeleteIcon };
