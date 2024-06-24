import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const StarcraftIconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_1_5559)"}>
      <path
        d={"M2.90002 3.12522C2.84171 3.07164 2.79778 3.00427 2.77228 2.92929C2.74677 2.85431 2.74049 2.77413 2.75403 2.6961C2.76757 2.61807 2.80048 2.54469 2.84975 2.48269C2.89902 2.42068 2.96307 2.37204 3.03602 2.34122L6.33102 0.800224C6.40869 0.763782 6.4938 0.745981 6.57956 0.748238C6.66532 0.750495 6.74937 0.772747 6.82502 0.813224L9.98602 2.50022C10.0645 2.54038 10.1305 2.60117 10.1771 2.67605C10.2236 2.75094 10.2488 2.83708 10.25 2.92522V22.7552C10.2439 22.8518 10.2114 22.9448 10.156 23.0242C10.1006 23.1035 10.0245 23.1661 9.93595 23.2051C9.8474 23.2441 9.74984 23.258 9.65392 23.2453C9.55799 23.2327 9.4674 23.1939 9.39202 23.1332C7.69729 21.8998 6.25148 20.3566 5.13102 18.5852C5.05174 18.4456 5.01005 18.2878 5.01002 18.1272V5.30022C5.00957 5.23505 4.99566 5.17068 4.96916 5.11114C4.94266 5.0516 4.90414 4.99818 4.85602 4.95422L2.90002 3.12522Z"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />

      <path
        d={"M20.6 3.12587C20.6583 3.07218 20.7022 3.00472 20.7277 2.92968C20.7532 2.85464 20.7594 2.7744 20.7459 2.69631C20.7324 2.61822 20.6995 2.54477 20.6502 2.48267C20.601 2.42058 20.537 2.37182 20.464 2.34087L17.169 0.799871C17.0913 0.763657 17.0062 0.745983 16.9205 0.748239C16.8347 0.750494 16.7507 0.772619 16.675 0.812871L13.514 2.49987C13.4355 2.54003 13.3695 2.60082 13.323 2.6757C13.2765 2.75058 13.2512 2.83673 13.25 2.92487V22.7549C13.2561 22.8514 13.2886 22.9445 13.344 23.0238C13.3994 23.1031 13.4755 23.1657 13.5641 23.2047C13.6526 23.2437 13.7502 23.2577 13.8461 23.245C13.942 23.2323 14.0326 23.1935 14.108 23.1329C15.8027 21.8995 17.2485 20.3563 18.369 18.5849C18.4483 18.4452 18.49 18.2874 18.49 18.1269V5.29987C18.4904 5.2347 18.5044 5.17033 18.5309 5.11079C18.5574 5.05125 18.5959 4.99782 18.644 4.95387L20.6 3.12587Z"}
        stroke={"currentColor"}
        strokeWidth={"1.5"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_1_5559"}>
        <rect width={"24"} height={"24"} fill={"currentColor"} />
      </clipPath>
    </defs>
  </svg>
));
StarcraftIconSvg.displayName = "StarcraftIconSvg";

const StarcraftIcon = withProps(Icon)({ svgComponent: StarcraftIconSvg });

export { StarcraftIcon };