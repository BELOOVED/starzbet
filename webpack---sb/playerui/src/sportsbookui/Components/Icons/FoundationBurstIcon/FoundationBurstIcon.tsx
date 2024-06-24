import { memo } from "react";
import { withProps } from "@sb/utils";
import { Icon } from "../../../../common/Components/Icon/Icon";

const FoundationBurstIconSvg = memo(() => (
  <svg
    width={"35"}
    height={"36"}
    viewBox={"0 0 35 36"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M34.8512 17.9821C34.8512 17.5839 34.6554 17.2338 34.3575 17.0142L34.3638 17.0034L30.168 14.581L32.5832 10.3978L32.5751 10.3929C32.6513 10.2205 32.6859 10.0325 32.676 9.84427C32.6661 9.656 32.6119 9.47272 32.5179 9.3093C32.4232 9.14603 32.2914 9.00739 32.133 8.90465C31.9747 8.80191 31.7943 8.73796 31.6067 8.718V8.7063H26.7611V3.87465H26.7512C26.731 3.6872 26.667 3.50714 26.5642 3.34905C26.4615 3.19097 26.323 3.05931 26.1599 2.96475C25.9962 2.87046 25.8125 2.81622 25.6239 2.80644C25.4353 2.79667 25.247 2.83164 25.0745 2.9085L25.0686 2.89815L20.8022 5.36145L18.4397 1.26915L18.4311 1.2741C18.3199 1.12188 18.1744 0.997987 18.0064 0.912459C17.8384 0.826931 17.6526 0.78217 17.4641 0.781799C17.0658 0.781799 16.7153 0.977549 16.4961 1.27545L16.4853 1.26915L14.0837 5.42895L9.94816 3.04125L9.94321 3.0498C9.77081 2.97351 9.58285 2.93893 9.39458 2.94886C9.20632 2.95879 9.02304 3.01295 8.85961 3.10695C8.69623 3.20156 8.55749 3.3334 8.45467 3.49174C8.35184 3.65009 8.28784 3.83046 8.26786 4.0182H8.25571V8.8215H3.48031V8.83095C3.29286 8.85111 3.1128 8.91516 2.95472 9.01789C2.79663 9.12062 2.66498 9.25915 2.57041 9.42225C2.47638 9.58583 2.42223 9.76929 2.41238 9.95772C2.40253 10.1462 2.43725 10.3342 2.51371 10.5067L2.50336 10.513L4.86406 14.6022L0.636764 17.043L0.641714 17.0515C0.489492 17.1628 0.365602 17.3083 0.280074 17.4763C0.194546 17.6443 0.149785 17.8301 0.149414 18.0186C0.149414 18.4168 0.345164 18.7674 0.643064 18.9865L0.636764 18.9973L4.83256 21.4197L2.41741 25.6029L2.42551 25.6074C2.34923 25.7798 2.31465 25.9678 2.32458 26.156C2.33451 26.3443 2.38867 26.5276 2.48266 26.691C2.57736 26.8543 2.70923 26.9929 2.86756 27.0956C3.02589 27.1984 3.20623 27.2623 3.39391 27.2823V27.2944H8.23906V32.1256H8.24896C8.29036 32.4928 8.49601 32.8367 8.84026 33.0355C9.00397 33.1297 9.18761 33.1839 9.37623 33.1937C9.56484 33.2035 9.7531 33.1686 9.92566 33.0918L9.93151 33.1021L14.198 30.6388L16.5605 34.7311L16.569 34.7262C16.6802 34.8784 16.8257 35.0023 16.9937 35.0878C17.1618 35.1734 17.3475 35.2181 17.5361 35.2185C17.9343 35.2185 18.2849 35.0227 18.504 34.7253L18.5144 34.7311L20.916 30.5713L25.052 32.959L25.0569 32.9505C25.2293 33.0268 25.4173 33.0614 25.6055 33.0514C25.7938 33.0415 25.9771 32.9873 26.1405 32.8933C26.3039 32.7987 26.4426 32.6669 26.5455 32.5086C26.6483 32.3502 26.7123 32.1698 26.7323 31.9821H26.7444V27.1793H31.5203V27.1698C31.7077 27.1496 31.8878 27.0856 32.0459 26.9829C32.2039 26.8801 32.3356 26.7416 32.4302 26.5785C32.5242 26.4148 32.5783 26.2313 32.5881 26.0428C32.598 25.8543 32.5633 25.6661 32.4869 25.4935L32.4972 25.4877L30.1365 21.3985L34.3638 18.9577L34.3589 18.9492C34.5111 18.838 34.6351 18.6925 34.7206 18.5245C34.8061 18.3565 34.8509 18.1707 34.8512 17.9821ZM14.6718 23.1099L10.2411 21.1524L12.1964 24.5386L11.0912 25.1767L8.09326 19.9851L9.22951 19.3285L13.518 21.2014L11.6348 17.9398L12.7404 17.3018L15.7374 22.4934L14.6718 23.1099ZM16.7652 21.9012L13.7678 16.7091L17.442 14.5882L18.0036 15.5611L15.4346 17.0439L16.0637 18.1338L18.5778 16.6825L19.1394 17.6545L16.6253 19.1067L17.3084 20.2897L19.8774 18.807L20.439 19.7799L16.7652 21.9012ZM25.2729 16.9895L22.3038 13.9501L23.459 18.0361L22.284 18.7148L17.7998 14.3817L19.0373 13.6671L22.1144 16.8927L20.9367 12.5704L21.8007 12.0718L24.9476 15.2574L23.6921 10.9797L24.9296 10.2651L26.4483 16.3113L25.2729 16.9895Z"}
      fill={"currentColor"}
    />
  </svg>
));
FoundationBurstIconSvg.displayName = "FoundationBurstIconSvg";

const FoundationBurstIcon = withProps(Icon)({ svgComponent: FoundationBurstIconSvg });

export { FoundationBurstIcon };