import { memo, type SVGProps } from "react";

const PresentIcon = memo<SVGProps<SVGSVGElement>>((props) => (
  <svg
    width={"13"}
    height={"12"}
    viewBox={"0 0 13 12"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
    {...props}
  >
    <path d={"M5.98438 3.37493H7.01562V5.99993H10.8594C10.9961 5.99993 11.1273 5.9456 11.224 5.84891C11.3207 5.75221 11.375 5.62106 11.375 5.4843V3.89056C11.375 3.7538 11.3207 3.62265 11.224 3.52595C11.1273 3.42926 10.9961 3.37493 10.8594 3.37493H9.45734C9.64721 2.9839 9.69142 2.53799 9.58206 2.11729C9.47269 1.69659 9.2169 1.32867 8.86064 1.07961C8.50438 0.830556 8.07099 0.716687 7.63831 0.758458C7.20564 0.800229 6.80204 0.994902 6.5 1.30751C6.19744 0.996615 5.79418 0.803447 5.3623 0.762531C4.93041 0.721614 4.49805 0.835617 4.14249 1.08416C3.78693 1.33271 3.53135 1.6996 3.42142 2.11925C3.31149 2.53891 3.35438 2.98399 3.54242 3.37493H2.14062C2.00387 3.37493 1.87272 3.42926 1.77602 3.52595C1.67932 3.62265 1.625 3.7538 1.625 3.89056V5.4843C1.625 5.62106 1.67932 5.75221 1.77602 5.84891C1.8239 5.89679 1.88075 5.93477 1.9433 5.96068C2.00586 5.98659 2.07291 5.99993 2.14062 5.99993H5.98438V3.37493ZM7.01562 2.57806C7.01562 2.42045 7.06236 2.26638 7.14992 2.13534C7.23748 2.00429 7.36194 1.90215 7.50755 1.84184C7.65316 1.78153 7.81338 1.76575 7.96796 1.79649C8.12254 1.82724 8.26453 1.90314 8.37598 2.01458C8.48742 2.12603 8.56332 2.26802 8.59406 2.42259C8.62481 2.57717 8.60903 2.7374 8.54872 2.88301C8.4884 3.02862 8.38627 3.15307 8.25522 3.24063C8.12417 3.3282 7.97011 3.37493 7.8125 3.37493H7.01562V2.57806ZM4.39062 2.57806C4.39062 2.36671 4.47458 2.16402 4.62402 2.01458C4.77347 1.86514 4.97616 1.78118 5.1875 1.78118C5.39884 1.78118 5.60153 1.86514 5.75098 2.01458C5.90042 2.16402 5.98438 2.36671 5.98438 2.57806V3.37493H5.1875C4.97616 3.37493 4.77347 3.29097 4.62402 3.14153C4.47458 2.99209 4.39062 2.7894 4.39062 2.57806Z"} fill={"white"} />

    <path d={"M7.01562 11.25H10.1094C10.2461 11.25 10.3773 11.1957 10.474 11.099C10.5707 11.0023 10.625 10.8711 10.625 10.7344V6.75H7.01562V11.25Z"} fill={"white"} />

    <path d={"M2.375 10.7344C2.375 10.8711 2.42932 11.0023 2.52602 11.099C2.62272 11.1957 2.75387 11.25 2.89062 11.25H5.98438V6.75H2.375V10.7344Z"} fill={"white"} />
  </svg>

));
PresentIcon.displayName = "PresentIcon";

export { PresentIcon };