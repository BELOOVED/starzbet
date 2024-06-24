import { memo } from "react";
import { type TVoidFn, voidFn } from "@sb/utils";
import classes from "./BetConstructorCheckbox.module.css";
import { Icon } from "../../../../../../../../common/Components/Icon/Icon";

const CheckboxCheckedSvg = memo(() => (
  <svg
    width={"20"}
    height={"22"}
    viewBox={"0 0 20 22"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <rect
      width={"20"}
      height={"22"}
      rx={"5"}
      fill={"url(#paint0_linear_1852_222607)"}
    />

    <g clipPath={"url(#clip0_1852_222607)"}>
      <path
        d={"M13.6753 7L8.58017 12.0568L6.4254 9.59675L5 11.0257L8.48114 15L15 8.53617L13.6753 7Z"}
        fill={"white"}
      />
    </g>

    <defs>
      <linearGradient
        id={"paint0_linear_1852_222607"}
        x1={"-7.45058e-08"}
        y1={"11"}
        x2={"20"}
        y2={"11"}
        gradientUnits={"userSpaceOnUse"}
      >
        <stop stopColor={"#FF9E00"} />

        <stop offset={"1"} stopColor={"#FF6D00"} />
      </linearGradient>

      <clipPath id={"clip0_1852_222607"}>
        <rect
          width={"10"}
          height={"8"}
          fill={"white"}
          transform={"translate(5 7)"}
        />
      </clipPath>
    </defs>
  </svg>
));
CheckboxCheckedSvg.displayName = "CheckboxCheckedSvg";

const CheckboxUncheckedSvg = memo(() => (
  <svg
    width={"20"}
    height={"22"}
    viewBox={"0 0 20 22"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <rect
      x={"0.5"}
      y={"0.5"}
      width={"19"}
      height={"21"}
      rx={"4.5"}
      fill={"#353C45"}
    />

    <rect
      x={"0.5"}
      y={"0.5"}
      width={"19"}
      height={"21"}
      rx={"4.5"}
      stroke={"#3E4651"}
    />
  </svg>
));
CheckboxUncheckedSvg.displayName = "CheckboxUncheckedSvg";

type TBetConstructorCheckboxProps = {
    checked: boolean;
    onChange?: TVoidFn;
}
const BetConstructorCheckbox = memo<TBetConstructorCheckboxProps>(
  ({ checked, onChange = voidFn }) => (
    <Icon
      className={classes.checkbox}
      onClick={onChange}
      svgComponent={checked ? CheckboxCheckedSvg : CheckboxUncheckedSvg}
    />
  ),
);
BetConstructorCheckbox.displayName = "BetConstructorCheckbox";

export { BetConstructorCheckbox };
