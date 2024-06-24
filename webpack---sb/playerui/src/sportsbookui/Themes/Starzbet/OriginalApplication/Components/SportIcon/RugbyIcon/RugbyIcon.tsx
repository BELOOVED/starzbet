import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const RugbyIconSvg = memo(() => (
  <svg
    width={"20"}
    height={"20"}
    viewBox={"0 0 20 20"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <g clipPath={"url(#clip0_702_24864)"}>
      <path
        d={"M11.7948 19.9573C12.0514 19.9856 12.3093 19.9999 12.5674 20C15.5749 20 18.7873 18.0783 19.739 13.5502C20.0927 11.8991 20.0868 10.1877 19.7218 8.53924C19.3568 6.89081 18.6417 5.34642 17.6281 4.0174C16.7163 2.79395 15.5492 1.79783 14.2134 1.10285C12.8775 0.407872 11.4071 0.0318602 9.91114 0.00268458C7.8339 -0.0453921 5.79081 0.553234 4.04835 1.72049C2.30589 2.88774 0.944928 4.56945 0.142974 6.54627C0.0426738 6.79211 -0.00586629 7.05712 0.000564951 7.32375C0.0069962 7.59039 0.0682522 7.85258 0.18028 8.09297C0.290116 8.32761 0.446969 8.53554 0.64048 8.70303C0.83399 8.87053 1.05976 8.99378 1.30286 9.06465L4.84358 10.0937V13.5369H1.58029C1.42111 13.5367 1.26346 13.5688 1.11633 13.6315C0.969197 13.6941 0.835474 13.7861 0.722793 13.902C0.610111 14.018 0.520677 14.1557 0.459598 14.3073C0.398519 14.4589 0.36699 14.6214 0.366812 14.7856V19.4725C0.366812 19.6117 0.42041 19.7451 0.515814 19.8435C0.611218 19.9419 0.740614 19.9972 0.875536 19.9972C3.28892 19.9972 5.57682 17.4348 5.83254 14.5855H8.14757V16.95C8.15028 18.4841 9.64932 19.7202 11.7948 19.9573ZM1.09666 7.63687C1.04735 7.53042 1.02052 7.41438 1.01795 7.29644C1.01537 7.1785 1.03712 7.06133 1.08174 6.95271C1.78441 5.20024 2.97662 3.70291 4.50671 2.65118C6.0368 1.59945 7.83564 1.04085 9.67442 1.04641H9.88808C11.2343 1.07408 12.5573 1.41392 13.7589 2.04073C14.9604 2.66754 16.0098 3.56524 16.8291 4.66728C17.7496 5.87488 18.3988 7.27803 18.73 8.7756C19.0613 10.2732 19.0662 11.8279 18.7446 13.3277C17.8445 17.6089 14.6592 19.22 11.9033 18.9143C10.3181 18.7387 9.16773 17.9132 9.16773 16.9507V11.9034C9.16679 11.4308 9.0167 10.9713 8.74014 10.5945C8.46357 10.2176 8.07557 9.94385 7.63478 9.81456L1.57893 8.0552C1.47415 8.02524 1.37684 7.97238 1.29362 7.90019C1.21041 7.82801 1.14323 7.7382 1.09666 7.63687ZM1.38697 18.8996V14.7856C1.38715 14.7327 1.40758 14.6821 1.44379 14.6448C1.48001 14.6074 1.52907 14.5864 1.58029 14.5862H4.81441C4.5865 16.652 3.0583 18.5645 1.38426 18.8975L1.38697 18.8996ZM5.86103 13.5369V10.3889L7.35939 10.8247C7.58698 10.8915 7.78731 11.0329 7.93011 11.2275C8.07291 11.4221 8.15043 11.6594 8.15096 11.9034V13.5369H5.86103Z"}
        fill={"currentColor"}
      />

      <path
        d={"M13.4798 15.803C13.9317 15.803 14.3733 15.6648 14.749 15.4059C15.1247 15.147 15.4175 14.7791 15.5904 14.3485C15.7633 13.918 15.8086 13.4443 15.7204 12.9873C15.6323 12.5302 15.4147 12.1104 15.0952 11.7809C14.7757 11.4514 14.3687 11.227 13.9255 11.1361C13.4824 11.0452 13.023 11.0918 12.6056 11.2702C12.1881 11.4485 11.8313 11.7505 11.5803 12.1379C11.3293 12.5254 11.1953 12.9809 11.1953 13.4469C11.196 14.0715 11.4369 14.6704 11.8652 15.1121C12.2935 15.5538 12.8742 15.8022 13.4798 15.803ZM13.4798 12.1401C13.7304 12.1401 13.9754 12.2168 14.1838 12.3604C14.3921 12.504 14.5545 12.7081 14.6504 12.9468C14.7463 13.1856 14.7714 13.4484 14.7225 13.7018C14.6736 13.9553 14.553 14.1882 14.3758 14.3709C14.1986 14.5537 13.9728 14.6781 13.727 14.7286C13.4812 14.779 13.2265 14.7531 12.9949 14.6542C12.7634 14.5553 12.5655 14.3878 12.4263 14.1729C12.2871 13.958 12.2128 13.7054 12.2128 13.4469C12.2131 13.1004 12.3467 12.7683 12.5843 12.5233C12.8218 12.2783 13.1439 12.1405 13.4798 12.1401Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_702_24864"}>
        <rect width={"20"} height={"20"} fill={"currentColor"} />
      </clipPath>
    </defs>
  </svg>
));
RugbyIconSvg.displayName = "RugbyIconSvg";

const RugbyIcon = withProps(Icon)({ svgComponent: RugbyIconSvg });

export { RugbyIcon };
