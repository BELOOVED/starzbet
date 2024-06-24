// @ts-nocheck
import { memo, useEffect, useRef, useState } from "react";
import { type QRCodeToDataURLOptions, toDataURL } from "qrcode";
import { useParamSelector } from "@sb/utils";
import { qaAttr } from "@sb/qa-attributes";
import { callRequestsOptionLinkSelector } from "../../../../Store/CallRequests/Selectors/CallRequestsSelectors";

const qrCodeOptions: QRCodeToDataURLOptions = {
  // Equals to 4px
  margin: 1,
  width: 90,
  color: {
    dark: "#262626FF",
    light: "#FFFFFFFF",
  },
};

const CallRequestQRCode = memo(({
  name,
  className = "",
  qaAttribute,
}) => {
  const link = useParamSelector(callRequestsOptionLinkSelector, [name]);

  const [qrCode, setQrCode] = useState<string | null>(null);
  const canvas = useRef(document.createElement("canvas"));

  useEffect(
    () => {
      /**
       * Actually QR Code creation is async operation
       * But it is performed way too fast. Maybe there is no need to treat it as async
       */

      async function setLink() {
        // You can await here
        await toDataURL(
          canvas.current,
          link,
          qrCodeOptions,
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

      >
        <img alt={"QR Code"} src={qrCode} {...qaAttr(qaAttribute)} />
      </a>
    )
    : null;
});
CallRequestQRCode.displayName = "CallRequestQRCode";

export { CallRequestQRCode };
