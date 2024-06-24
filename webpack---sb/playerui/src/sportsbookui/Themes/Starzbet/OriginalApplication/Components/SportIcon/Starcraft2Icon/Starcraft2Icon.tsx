import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const Starcraft2IconSvg = memo(() => (
  <svg
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M2.90295 3.12718C2.84464 3.07359 2.80071 3.00622 2.7752 2.93124C2.7497 2.85627 2.74342 2.77609 2.75696 2.69806C2.7705 2.62003 2.80341 2.54664 2.85268 2.48464C2.90195 2.42263 2.966 2.37399 3.03895 2.34318L6.33395 0.802177C6.41162 0.765735 6.49673 0.747934 6.58249 0.750191C6.66825 0.752448 6.7523 0.774701 6.82795 0.815177L9.98895 2.50218C10.0674 2.54234 10.1335 2.60313 10.18 2.67801C10.2265 2.75289 10.2517 2.83903 10.253 2.92718V22.7572C10.2468 22.8537 10.2143 22.9468 10.1589 23.0261C10.1035 23.1054 10.0274 23.168 9.93888 23.207C9.85033 23.246 9.75277 23.26 9.65685 23.2473C9.56092 23.2346 9.47033 23.1958 9.39495 23.1352C7.70022 21.9018 6.25441 20.3586 5.13395 18.5872C5.05467 18.4475 5.01298 18.2897 5.01295 18.1292V5.30218C5.0125 5.23701 4.99859 5.17263 4.97209 5.11309C4.94559 5.05355 4.90707 5.00013 4.85895 4.95618L2.90295 3.12718Z"}
      stroke={"currentColor"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />

    <path
      d={"M20.6 3.12782C20.6583 3.07413 20.7022 3.00668 20.7277 2.93163C20.7532 2.85659 20.7594 2.77635 20.7459 2.69826C20.7324 2.62017 20.6995 2.54672 20.6502 2.48463C20.601 2.42253 20.537 2.37378 20.464 2.34282L17.169 0.801824C17.0913 0.765611 17.0062 0.747936 16.9205 0.750192C16.8347 0.752448 16.7507 0.774572 16.675 0.814824L13.514 2.50182C13.4355 2.54198 13.3695 2.60277 13.323 2.67765C13.2765 2.75254 13.2512 2.83868 13.25 2.92682V22.7568C13.2561 22.8534 13.2886 22.9464 13.344 23.0258C13.3994 23.1051 13.4755 23.1677 13.5641 23.2067C13.6526 23.2457 13.7502 23.2596 13.8461 23.247C13.942 23.2343 14.0326 23.1955 14.108 23.1348C15.8027 21.9014 17.2485 20.3582 18.369 18.5868C18.4483 18.4472 18.49 18.2894 18.49 18.1288V5.30183C18.4904 5.23665 18.5044 5.17228 18.5309 5.11274C18.5574 5.0532 18.5959 4.99978 18.644 4.95582L20.6 3.12782Z"}
      stroke={"currentColor"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
  </svg>
));
Starcraft2IconSvg.displayName = "Starcraft2IconSvg";

const Starcraft2Icon = withProps(Icon)({ svgComponent: Starcraft2IconSvg });

export { Starcraft2Icon };