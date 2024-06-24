import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../../../common/Components/Icon/Icon";

const Warcraft3IconSvg = memo(() => (
  <svg
    width={"20"}
    height={"20"}
    viewBox={"0 0 20 20"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M8.28688 11.8661L10.1769 4.77417L12.0459 11.7424L13.1483 5.74348C13.2792 4.88702 13.1246 4.7688 12.6938 4.42287L16.9574 4.42964C16.4752 4.82119 16.095 5.38442 15.7614 6.2179C15.1473 8.84463 14.5796 11.6536 14.1191 14.5889C14.0274 15.0669 14.155 15.5533 14.6281 16.0528H10.6689C10.8435 15.5699 10.854 15.0368 10.7632 14.4727L10.1948 11.4829C10.1948 11.4829 9.45438 14.434 9.40502 14.9529C9.34682 15.5648 9.6577 16.0528 9.6577 16.0528H5.63367C6.45862 15.4217 6.4433 15.2086 6.20164 14.1474C5.62755 11.5457 4.90814 8.79198 4.0328 5.87516C3.9423 4.96118 3.09184 4.38801 3.09184 4.38801L7.12923 4.38801C7.12923 4.38801 6.82586 5.29424 7.09735 6.52578C7.36239 8.119 7.78846 9.94112 8.28688 11.8661ZM4.49493 3.58121V2.24636C4.61671 1.93267 5.02804 1.56088 5.50829 1.19588L5.50829 1H0V1.18716C0.530092 1.60378 1.01008 2.03963 1.01121 2.31608V17.6871C1.01121 17.9187 0.453234 18.4935 0 18.7771V19H5.4833V18.8017C5.28587 18.6618 4.39827 18.0263 4.46623 17.6051V10.3027L3.19547 5.66216C3.11947 5.34325 2.9092 5.0223 2.46739 4.69783C1.97377 4.26796 2.48169 3.52618 2.91853 3.58121H4.49493ZM16.993 3.53958C17.6125 3.53958 18.0311 4.26413 17.5278 4.73805C16.9845 5.21197 16.7117 5.73767 16.6356 6.05658C16.2798 7.46785 15.9281 9.2341 15.578 11.1354L15.6162 17.5477C15.6841 17.9689 14.7583 18.6618 14.5609 18.8017V19H20V18.7771C19.5468 18.4935 18.9888 17.9187 18.9888 17.6871L18.9888 2.31608C18.9899 2.03963 19.4699 1.60379 20 1.18716V1L14.5359 1V1.19588C15.0162 1.56089 15.4275 1.93267 15.5493 2.24637V3.53958H16.993ZM11.741 2.30446C11.7904 2.00238 12.3067 1.51925 12.7869 1.15424V1H7.27861V1.18716C7.80871 1.60378 8.33506 2.02562 8.33506 2.42064L8.29804 8.77587L9.43712 4.45144C9.66377 3.76965 10.5821 3.7604 10.8213 4.43749L11.9632 8.77587C11.9714 7.19354 11.8692 4.8329 11.741 2.30446ZM8.38666 16.5497V17.6871C8.22623 18.117 7.75113 18.512 7.35006 18.7909V18.9768H12.8591V18.7909C12.4283 18.534 12.0642 18.2343 11.7556 17.7452V16.5497H8.38666Z"}
      fill={"currentColor"}
    />
  </svg>
));
Warcraft3IconSvg.displayName = "Warcraft3IconSvg";

const Warcraft3Icon = withProps(Icon)({ svgComponent: Warcraft3IconSvg });

export { Warcraft3Icon };
