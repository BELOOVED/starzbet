import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const Dota2IconSvg = memo(() => (
  <svg
    width={"20"}
    height={"20"}
    viewBox={"0 0 20 20"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_702_24811)"}>
      <path
        d={"M20 4.64427C19.9216 0.922199 19.9166 1.72675 19.993 0.566417C19.995 0.533408 19.984 0.500914 19.9624 0.476017C19.9407 0.45112 19.9102 0.435839 19.8773 0.433504C14.3646 0.0544748 14.1554 0.0110128 13.7282 0.0110128C6.2072 0.0105074 10.1557 -0.113309 0.116831 0.48202C0.100583 0.482923 0.0846726 0.487041 0.0700111 0.494139C0.0553496 0.501236 0.0422256 0.511173 0.0313915 0.52338C0.0205574 0.535587 0.0122263 0.549824 0.00687572 0.565274C0.00152518 0.580724 -0.000739583 0.597084 0.000211312 0.613417C0.647149 13.0931 0.623524 11.0574 0.292766 19.3749C0.291547 19.4038 0.300423 19.4323 0.317861 19.4553C0.3353 19.4784 0.360205 19.4946 0.388274 19.5012C1.13977 19.6796 1.00656 19.6093 2.75937 19.6109C2.76239 19.6109 6.04383 19.2515 6.04685 19.251C6.06243 19.2536 10.585 20 10.6005 20H10.6106C15.9113 19.5533 14.3917 19.6614 17.8114 19.4709L19.819 19.8792C19.8373 19.8833 19.8563 19.8831 19.8745 19.8787C19.8927 19.8743 19.9097 19.8659 19.9242 19.854C19.9387 19.8421 19.9504 19.827 19.9583 19.8099C19.9662 19.7929 19.9701 19.7742 19.9698 19.7554C19.9246 15.6907 20 4.64427 20 4.64427ZM11.8497 4.3461L11.9125 4.33043L13.3416 4.00649C14.0735 3.82202 14.1821 3.77705 14.8084 3.4809C15.0974 3.58197 15.8907 4.02316 16.0917 4.27635C16.2244 4.44414 16.2159 4.48154 16.1742 4.66094C16.1661 4.69531 16.1566 4.73523 16.147 4.78173V4.79133L15.8329 7.26361C15.5217 7.27523 15.4956 7.25148 15.4096 7.17163C15.3609 7.12501 15.3083 7.08273 15.2523 7.04529C14.7793 6.7264 13.2315 5.57516 12.7429 5.17895L11.7808 4.40472L11.7889 4.39714C11.7994 4.38619 11.8081 4.37355 11.8145 4.35974C11.8257 4.35381 11.8375 4.34923 11.8497 4.3461ZM14.0765 16.7949C14.0484 16.7687 2.07021 3.99941 2.05865 3.98172L3.10572 3.17313L17.7335 12.9106C17.6123 13.2588 17.5641 13.6586 17.4912 13.9901C17.2343 15.1626 16.904 15.675 16.3853 16.7889C15.6474 16.8202 14.1273 16.8141 14.0765 16.797V16.7949ZM3.17609 13.3417C3.31081 13.0163 3.49579 12.4927 3.65111 12.2299C4.41618 12.7105 7.40506 15.7296 7.66495 16.1369C7.52118 16.191 6.9029 16.283 5.87543 16.6959C5.22196 16.9572 4.60971 17.2048 4.01555 17.0021C3.95624 16.9819 3.7984 16.8475 3.56315 16.6443C3.23981 16.3573 2.89328 16.0978 2.52714 15.8686C2.1431 15.6432 2.20292 15.6912 3.17609 13.3417Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_702_24811"}>
        <rect width={"20"} height={"20"} fill={"currentColor"} />
      </clipPath>
    </defs>
  </svg>
));
Dota2IconSvg.displayName = "Dota2IconSvg";

const Dota2Icon = withProps(Icon)({ svgComponent: Dota2IconSvg });

export { Dota2Icon };
