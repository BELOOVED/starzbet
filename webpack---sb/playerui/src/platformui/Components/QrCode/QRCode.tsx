import { memo, useEffect, useRef, useState } from "react";
import { type QRCodeToDataURLOptions, toDataURL } from "qrcode";
import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";

const QR_CODE_OPTIONS: QRCodeToDataURLOptions = {
  // Equals to 4px
  margin: 1,
  width: 90,
  color: {
    dark: "#262626FF",
    light: "#FFFFFFFF",
  },
};

interface IQRCodeProps extends IWithClassName, IWithQaAttribute {
  link: string;
  options?: QRCodeToDataURLOptions;
}

const QRCode = memo<IQRCodeProps>(({
  link,
  className = "",
  qaAttribute,
  options = QR_CODE_OPTIONS,
}) => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const canvas = useRef(document.createElement("canvas"));

  useEffect(
    () => {
      function setLink() {
        toDataURL(
          canvas.current,
          link,
          options,
          (error, dataUrl) => {
            if (error) {
              setQrCode(null);
            } else {
              setQrCode(dataUrl);
            }
          },
        );
      }

      void setLink();
    },
    [link],
  );

  return qrCode
    ? (
      <a
        className={className}
        href={link}
        rel={"noreferrer"}
        target={"_blank"}
        {...qaAttr(qaAttribute)}
      >
        <img alt={"QR Code"} src={qrCode} />
      </a>
    )
    : null;
});
QRCode.displayName = "CallRequestQRCode";

export { QRCode };
