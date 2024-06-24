import filesize from "filesize";
import { type FC, memo, type ReactNode, useContext, useEffect, useRef, useState } from "react";
import { type TFile_Fragment } from "@sb/graphql-client";
import { isString } from "@sb/utils";
import classes from "./PrivateFileLinks.module.css";
import { FileServerApiContext } from "../../Api/FileServerApi";

//all file - temporary solution, todo @DS
const PDFFileSvg = () => (
  <svg
    width={"28"}
    height={"36"}
    viewBox={"0 0 28 36"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <rect
      width={"28"}
      height={"36"}
      rx={"2"}
      fill={"#D70015"}
    />

    <path
      d={"M14.0423 16.1833C14.4017 16.3492 14.327 16.5642 14.2165 17.5799C14.1036 18.6276 13.7251 20.5415 12.996 22.4241C12.2661 24.3037 11.1832 26.1506 10.2394 27.5176C9.29639 28.8854 8.48937 29.7742 7.87396 30.2875C7.25617 30.8008 6.8292 30.9379 6.55012 30.9831C6.27343 31.0283 6.14781 30.9831 6.07307 30.8452C5.99833 30.7081 5.97209 30.4822 6.03649 30.2065C6.0993 29.9339 6.24958 29.6145 6.67575 29.2056C7.1059 28.7951 7.80956 28.2926 8.79151 27.8261C9.77345 27.3587 11.0313 26.9256 12.0641 26.6288C13.097 26.3336 13.9016 26.1732 14.6061 26.0478C15.3121 25.9216 15.9156 25.832 16.5071 25.7853C17.0987 25.7416 17.6791 25.7416 18.2452 25.7853C18.8113 25.832 19.3647 25.9216 19.8442 26.0369C20.3212 26.1506 20.7251 26.2869 21.0774 26.505C21.4288 26.72 21.7317 27.0168 21.882 27.3486C22.0347 27.6781 22.0347 28.0442 21.9082 28.3051C21.7826 28.5676 21.5298 28.7265 21.2411 28.8192C20.9517 28.9088 20.6249 28.9314 20.2338 28.8192C19.8442 28.7039 19.3894 28.4531 18.9123 28.1228C18.4345 27.7918 17.9304 27.3813 17.2768 26.7433C16.6216 26.1054 15.8154 25.24 15.1364 24.3964C14.4574 23.5528 13.9016 22.7326 13.5239 22.037C13.1478 21.3414 12.9459 20.772 12.7821 20.2026C12.6183 19.6317 12.4927 19.0623 12.4426 18.5497C12.3925 18.0372 12.4156 17.5799 12.4664 17.2146C12.5165 16.8516 12.5937 16.5759 12.7185 16.3928C12.8441 16.2137 13.0214 16.1202 13.1471 16.075C13.2727 16.0299 13.349 16.0299 13.4237 16.0182C13.4985 16.0065 13.5732 15.9839 13.6885 16.0182C13.7982 16.0509 13.9437 16.1381 14.0892 16.2269"}
      stroke={"#FEFEFE"}
      strokeMiterlimit={"10"}
      strokeLinejoin={"round"}
    />

    <path
      d={"M6.75746 12V6.18182H8.93928C9.38625 6.18182 9.76125 6.26515 10.0643 6.43182C10.3692 6.59848 10.5993 6.82765 10.7546 7.11932C10.9118 7.40909 10.9904 7.73864 10.9904 8.10795C10.9904 8.48106 10.9118 8.8125 10.7546 9.10227C10.5974 9.39205 10.3654 9.62027 10.0586 9.78693C9.75178 9.9517 9.37393 10.0341 8.92507 10.0341H7.47905V9.16761H8.78303C9.04439 9.16761 9.2584 9.12216 9.42507 9.03125C9.59174 8.94034 9.71484 8.81534 9.79439 8.65625C9.87583 8.49716 9.91655 8.31439 9.91655 8.10795C9.91655 7.90152 9.87583 7.7197 9.79439 7.5625C9.71484 7.4053 9.59079 7.28314 9.42223 7.19602C9.25556 7.10701 9.0406 7.0625 8.77734 7.0625H7.81143V12H6.75746ZM13.8775 12H11.9059V6.18182H13.9173C14.4949 6.18182 14.9911 6.2983 15.4059 6.53125C15.8226 6.76231 16.1426 7.0947 16.3661 7.52841C16.5896 7.96212 16.7013 8.48106 16.7013 9.08523C16.7013 9.69129 16.5887 10.2121 16.3633 10.6477C16.1398 11.0833 15.8169 11.4176 15.3945 11.6506C14.9741 11.8835 14.4684 12 13.8775 12ZM12.9599 11.0881H13.8263C14.2317 11.0881 14.5697 11.0142 14.8406 10.8665C15.1114 10.7169 15.315 10.4943 15.4513 10.1989C15.5877 9.90152 15.6559 9.5303 15.6559 9.08523C15.6559 8.64015 15.5877 8.27083 15.4513 7.97727C15.315 7.68182 15.1133 7.46117 14.8462 7.31534C14.5811 7.16761 14.2515 7.09375 13.8576 7.09375H12.9599V11.0881ZM17.7028 12V6.18182H21.43V7.06534H18.7567V8.64489H21.1744V9.52841H18.7567V12H17.7028Z"}
      fill={"#FEFEFE"}
    />
  </svg>
);

interface IPrivateFileProps {
  pathToFile: string;
  children: (result: string | null) => ReactNode;
}

const PrivateFile: FC<IPrivateFileProps> = ({ pathToFile, children }) => {
  const mount = useRef(false);

  const [base64, setBase64] = useState<string | null>(null);

  const fileServerApi = useContext(FileServerApiContext);

  useEffect(
    () => {
      mount.current = true;

      void fileServerApi.load(pathToFile).then((result) => {
        if (mount.current && isString(result)) {
          setBase64(result);
        }
      });

      return () => {
        mount.current = false;
      };
    },
    [],
  );

  return children(base64);
};
PrivateFile.displayName = "PrivateFile";

interface IPrivateFileLinksProps {
  files: TFile_Fragment[];
}

const PrivateFileLinks = memo<IPrivateFileLinksProps>(({ files }) => (
  <div className={classes.filesContainer}>
    {
      files.map(
        ({
          pathToFile,
          originName,
          id,
          size,
        }) => (
          <PrivateFile pathToFile={pathToFile} key={id}>
            {
              (base64) => base64
                ? (
                  <a href={base64} download={originName}>
                    <div className={classes.linkContainer}>
                      <PDFFileSvg />

                      <div className={classes.linkInfo}>
                        <span>{originName}</span>

                        <span>{filesize(size)}</span>
                      </div>
                    </div>
                  </a>
                )
                : null
            }
          </PrivateFile>
        ),
      )
    }
  </div>
));
PrivateFileLinks.displayName = "PrivateFileLinks";

export { PrivateFileLinks, PrivateFile };
