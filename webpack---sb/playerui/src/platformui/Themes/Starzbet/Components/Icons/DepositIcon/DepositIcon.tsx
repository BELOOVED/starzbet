import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const DepositIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path d={"M18.9945 4.64243C18.3813 4.44913 17.6921 4.35528 16.896 4.30615C15.986 4.25 14.8801 4.25 13.5233 4.25H10.4607C8.85735 4.24999 7.60039 4.24999 6.5962 4.34547C5.57265 4.44279 4.73455 4.64457 3.99573 5.09732C3.22203 5.57144 2.57153 6.22194 2.09741 6.99563C2.08062 7.02304 2.06416 7.05059 2.04805 7.07828C2.12534 5.63513 2.32723 4.67932 2.85454 3.92267C3.13049 3.5267 3.46451 3.17848 3.84432 2.89079C5.02036 2 6.69796 2 10.0532 2H15.4219C17.1091 2 17.9527 2 18.4769 2.54645C18.8794 2.96614 18.9728 3.58228 18.9945 4.64243Z"} fill={"currentColor"} />

    <path d={"M2.7368 7.38751C2 8.58985 2 10.2266 2 13.5C2 16.7734 2 18.4101 2.7368 19.6125C3.14908 20.2853 3.71473 20.8509 4.38751 21.2632C5.58985 22 7.22657 22 10.5 22H13.5C16.7734 22 18.4101 22 19.6125 21.2632C20.2853 20.8509 20.8509 20.2853 21.2632 19.6125C21.7471 18.8229 21.9132 17.8459 21.9702 16.3409H15.6365C13.716 16.3409 12.1592 14.7841 12.1592 12.8637C12.1592 10.9432 13.716 9.38638 15.6365 9.38638H21.8777C21.7775 8.55873 21.5951 7.92906 21.2632 7.38751C20.8509 6.71473 20.2853 6.14908 19.6125 5.7368C19.421 5.61943 19.2184 5.52076 19 5.43781C17.8472 5 16.252 5 13.5 5H10.5C7.22657 5 5.58985 5 4.38751 5.7368C3.71473 6.14908 3.14908 6.71473 2.7368 7.38751Z"} fill={"currentColor"} />

    <path
      fillRule={"evenodd"}
      clipRule={"evenodd"}
      d={"M21.9779 10.8864H15.6365C14.5444 10.8864 13.6592 11.7716 13.6592 12.8637C13.6592 13.9557 14.5444 14.8409 15.6365 14.8409H21.9977C22 14.4268 22 13.9811 22 13.5C22 12.4828 22 11.6236 21.9779 10.8864ZM15.6365 12.1137C15.2222 12.1137 14.8865 12.4494 14.8865 12.8637C14.8865 13.2779 15.2222 13.6137 15.6365 13.6137H18.3637C18.7779 13.6137 19.1137 13.2779 19.1137 12.8637C19.1137 12.4494 18.7779 12.1137 18.3637 12.1137H15.6365Z"}
      fill={"currentColor"}
    />
  </svg>
));
DepositIconSvg.displayName = "DepositIconSvg";

const DepositIcon = withProps(Icon)({ svgComponent: DepositIconSvg });

export { DepositIcon };
