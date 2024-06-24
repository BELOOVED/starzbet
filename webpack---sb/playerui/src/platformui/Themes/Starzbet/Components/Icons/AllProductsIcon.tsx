import { memo, type SVGProps } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../common/Components/Icon/Icon";

const AllProductsIconSvg = memo<SVGProps<SVGSVGElement>>((props) => (
  <svg
    width={"18"}
    height={"10"}
    viewBox={"0 0 18 10"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
    {...props}
  >
    <path
      d={"M16.2878 1.51603C14.8084 -0.134104 12.3617 -0.475486 10.4839 0.681518C10.0856 0.92808 9.70632 1.26945 9.36493 1.68677L8.72005 2.48337L7.06991 4.55069L6.06466 5.7835C5.91291 5.97314 5.74216 6.12488 5.59055 6.21971C4.77493 6.71285 3.73175 6.5611 3.08691 5.8593C2.42303 5.11962 2.42303 3.98162 3.08691 3.24194C3.46618 2.82461 3.99736 2.59706 4.54741 2.59706C4.90782 2.59706 5.2682 2.7109 5.59059 2.88152C5.76135 2.97634 5.91309 3.12808 6.06469 3.31774L6.33469 3.64894L8.00225 1.60387C7.67975 1.22539 7.32685 0.910926 6.95612 0.681384C5.07843 -0.47562 2.63166 -0.134238 1.15223 1.5159C-0.384077 3.24184 -0.384077 5.91612 1.15223 7.6232C2.04366 8.62846 3.2955 9.14048 4.54731 9.14048C5.38182 9.14048 6.19745 8.91294 6.95615 8.43869C7.35445 8.19212 7.73375 7.85075 8.07527 7.43343L8.72015 6.63684L10.3892 4.56951L11.3944 3.33671C11.5462 3.14706 11.7168 2.99532 11.8685 2.90049C12.6842 2.40736 13.7273 2.55911 14.3722 3.2609C15.0361 4.00058 15.0361 5.13859 14.3722 5.87827C13.7273 6.58006 12.6842 6.73181 11.8685 6.23868C11.6978 6.14386 11.546 5.99212 11.3944 5.80246L11.1143 5.45882L9.42905 7.52559C9.75383 7.90863 10.1099 8.22642 10.4839 8.45785C12.3616 9.61485 14.8083 9.27347 16.2878 7.62334C17.8241 5.8974 17.8241 3.22312 16.2878 1.51603L16.2878 1.51603Z"}
      fill={"currentColor"}
    />
  </svg>

));
AllProductsIconSvg.displayName = "AllProductsIconSvg";

const AllProductsIcon = withProps(Icon)({ svgComponent: AllProductsIconSvg });

export { AllProductsIcon };
