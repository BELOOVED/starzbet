import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../common/Components/Icon/Icon";

const GiftIconSvg = memo(() => (
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"16"}
    height={"16"}
    viewBox={"0 0 16 16"}
    fill={"none"}
  >
    <g clipPath={"url(#clip0_3248_25537)"}>
      <path d={"M1.33325 9.67847H7.49992V15.9999H2.49992C1.85992 15.9999 1.33325 15.4743 1.33325 14.8355V9.67847Z"} fill={"currentColor"} />

      <path d={"M14.6667 9.67847V14.8355C14.6667 15.4743 14.14 15.9999 13.5 15.9999H8.5V9.67847H14.6667Z"} fill={"currentColor"} />

      <path
        d={"M0 5.85235V7.5159C0 8.1547 0.526667 8.68038 1.16667 8.68038H1.33333H7.5V7.68225V4.68787H1.16667C0.526667 4.68787 0 5.21355 0 5.85235Z"}
        fill={"currentColor"}
      />

      <path
        d={"M14.8333 4.68787H8.5V7.68225V8.68038H14.6667H14.8333C15.4733 8.68038 16 8.1547 16 7.5159V5.85235C16 5.21355 15.4733 4.68787 14.8333 4.68787Z"}
        fill={"currentColor"}
      />

      <path
        d={"M8.00006 5.38257C7.85473 5.38257 7.71606 5.31936 7.62206 5.20957C7.52673 5.09977 7.48473 4.95404 7.5054 4.81031C7.75207 3.14677 9.05407 0 12.2194 0C14.0261 0.000665419 14.6667 0.974839 14.6667 1.80927C14.6667 3.29249 12.5981 5.38257 8.00006 5.38257ZM12.2194 0.998794C9.8314 0.998794 8.92473 3.26455 8.62406 4.36981C10.5081 4.28197 11.6961 3.8062 12.3801 3.40096C13.3287 2.83868 13.6667 2.20986 13.6667 1.80861C13.6667 1.21106 12.9194 0.998794 12.2194 0.998794Z"}
        fill={"currentColor"}
      />

      <path
        d={"M8.00065 5.38252C3.40265 5.38252 1.33398 3.29244 1.33398 1.80922C1.33398 0.974784 1.97532 0.000610352 3.78198 0.000610352C6.94665 0.000610352 8.24865 3.14738 8.49532 4.81092C8.51599 4.95465 8.47398 5.10038 8.37865 5.21018C8.28465 5.3193 8.14598 5.38252 8.00065 5.38252ZM3.78198 0.998739C3.08198 0.998739 2.33398 1.21167 2.33398 1.80922C2.33398 2.65896 3.82265 4.20739 7.37598 4.37042C7.07598 3.26449 6.16932 0.998739 3.78198 0.998739Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_3248_25537"}>
        <rect width={"16"} height={"16"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>
));
GiftIconSvg.displayName = "GiftIconSvg";

const Gift2Icon = withProps(Icon)({ svgComponent: GiftIconSvg });

export { Gift2Icon };
