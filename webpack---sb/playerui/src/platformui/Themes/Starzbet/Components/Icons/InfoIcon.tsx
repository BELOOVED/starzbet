import { memo, type SVGProps } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../../common/Components/Icon/Icon";

const InfoIconSvg = memo<SVGProps<SVGSVGElement>>((props) => (
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"20"}
    height={"20"}
    viewBox={"0 0 20 20"}
    fill={"currentColor"}
    {...props}
  >
    <g clipPath={"url(#clip0_1784_166546)"}>
      <path
        d={"M11.3366 14.0905C11.1322 14.1096 10.9269 14.0635 10.7503 13.9587C10.6212 13.8262 10.5593 13.6423 10.5821 13.4587C10.5869 13.3059 10.6051 13.1538 10.6366 13.0042C10.6671 12.8325 10.7066 12.6626 10.7548 12.4951L11.2912 10.6496C11.3465 10.4675 11.383 10.2801 11.4003 10.0905C11.4003 9.88597 11.4275 9.74504 11.4275 9.66324C11.4389 9.29867 11.2833 8.94882 11.0048 8.71324C10.6623 8.45027 10.2357 8.32101 9.80481 8.34961C9.49602 8.35425 9.18961 8.4048 8.8957 8.49961C8.57449 8.59961 8.2366 8.71929 7.88207 8.85871L7.72754 9.45871C7.83207 9.42234 7.95938 9.38144 8.1048 9.33597C8.24355 9.29488 8.38738 9.27343 8.53207 9.27234C8.73504 9.25035 8.93934 9.30019 9.10934 9.41324C9.2248 9.55101 9.27898 9.73 9.25934 9.90871C9.25883 10.0616 9.24207 10.2139 9.20934 10.3632C9.1775 10.5223 9.1366 10.6905 9.0866 10.8678L8.5457 12.7223C8.50211 12.8947 8.46723 13.0691 8.44117 13.245C8.41992 13.3956 8.4093 13.5475 8.40934 13.6996C8.40711 14.0666 8.57496 14.4141 8.86387 14.6405C9.21168 14.9075 9.64434 15.0399 10.082 15.0132C10.3902 15.0195 10.6974 14.975 10.9911 14.8814C11.2487 14.7935 11.5927 14.6677 12.023 14.5041L12.1684 13.9314C12.0519 13.9797 11.9318 14.0192 11.8093 14.0495C11.6544 14.0849 11.4954 14.0987 11.3366 14.0905Z"}
        fill={"currentColor"}
      />

      <path
        d={"M11.9041 5.34132C11.6568 5.11413 11.3308 4.9919 10.995 5.00042C10.6594 4.99284 10.3338 5.11495 10.0859 5.34132C9.63156 5.73311 9.58081 6.41909 9.97265 6.8735C10.0076 6.91401 10.0454 6.95186 10.0859 6.98678C10.6036 7.44979 11.3865 7.44979 11.9041 6.98678C12.3585 6.59112 12.4061 5.90206 12.0104 5.44768C11.9775 5.40983 11.942 5.37428 11.9041 5.34132Z"}
        fill={"currentColor"}
      />

      <path
        d={"M10 0C4.47715 0 0 4.47715 0 10C0 15.5229 4.47715 20 10 20C15.5229 20 20 15.5229 20 10C20 4.47715 15.5229 0 10 0ZM10 19.0909C4.97922 19.0909 0.909102 15.0208 0.909102 10C0.909102 4.97922 4.97922 0.909102 10 0.909102C15.0208 0.909102 19.0909 4.97922 19.0909 10C19.0909 15.0208 15.0208 19.0909 10 19.0909Z"}
        fill={"currentColor"}
      />
    </g>

    <defs>
      <clipPath id={"clip0_1784_166546"}>
        <rect width={"20"} height={"20"} fill={"currentColor"} />
      </clipPath>
    </defs>
  </svg>
));
InfoIconSvg.displayName = "InfoIconSvg";

const InfoIcon = withProps(Icon)({ svgComponent: InfoIconSvg });

export { InfoIcon };
